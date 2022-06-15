import { useEffect, useState } from "react";
import { useCall, BSC } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";

import { MASTERCHEF_ADDRESS, TALLY } from "../assets/data/addresses.js";
import masterchefAbi from "../assets/abi/Masterchef.json";
import ierc20Abi from "../assets/abi/IERC20.json";
import pairAbi from "../assets/abi/TallyswapPair.json";
import { useTokenPrice, useAverageBlockTime } from "./index";

export const useTotalAmountStaked = (chainId) => {
  const [tas, setTas] = useState(undefined);
  const [tvs, setTvs] = useState(undefined);

  // get total staked Tally
  const totalStaked =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "depositedTALLY",
      args: [],
    })?.value?.[0] ?? undefined;

  // token decimals
  const tokenDecimal =
    (
      useCall(
        TALLY[chainId] && {
          contract: new Contract(TALLY[chainId], ierc20Abi),
          method: "decimals",
          args: [],
        }
      ) ?? {}
    )?.value?.[0] ?? undefined;

  const tallyPrice = useTokenPrice(TALLY[BSC.chainId]);

  useEffect(() => {
    if (totalStaked && tokenDecimal)
      setTas(utils.formatUnits(totalStaked, tokenDecimal));
    else setTas(undefined);

    if (totalStaked && tokenDecimal && tallyPrice !== undefined)
      setTvs(utils.formatUnits(totalStaked, tokenDecimal) * tallyPrice);
    else setTvs(undefined);
  }, [totalStaked, tokenDecimal, tallyPrice]);

  return [tas, tvs];
};

export const useTotalValueLocked = (chainId) => {
  const [tvl, setTvl] = useState(undefined);
  const [, tvs] = useTotalAmountStaked(chainId);

  // NOTE: this should be staking + farming + liquidity in the future
  useEffect(() => {
    if (tvs) setTvl(tvs);
    else setTvl(undefined);
  }, [tvs]);

  return tvl;
};

export const usePerformanceFee = (chainId) => {
  const [perfFee, setPerfFee] = useState(undefined);

  const percentDec =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "percentDec",
      args: [],
    })?.value?.[0] ?? undefined;

  // get total performance fee
  const reserveFee =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "reservPercent",
      args: [],
    })?.value?.[0] ?? undefined;

  const maintenanceSecurityFee =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "maintenanceSecurityPercent",
      args: [],
    })?.value?.[0] ?? undefined;

  const buyBackFee =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "buyBackReservesPercent",
      args: [],
    })?.value?.[0] ?? undefined;

  const operationFee =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "operationManagerPercent",
      args: [],
    })?.value?.[0] ?? undefined;

  useEffect(() => {
    setPerfFee(
      reserveFee &&
        operationFee &&
        maintenanceSecurityFee &&
        buyBackFee &&
        percentDec &&
        percentDec.toNumber() !== 0
        ? ((reserveFee.toNumber() +
            operationFee.toNumber() +
            maintenanceSecurityFee.toNumber() +
            buyBackFee.toNumber()) /
            percentDec.toNumber()) *
            100
        : undefined
    );
  }, [
    reserveFee,
    operationFee,
    buyBackFee,
    maintenanceSecurityFee,
    percentDec,
  ]);

  return perfFee;
};

export const useAPR = (poolId, chainId) => {
  const [apr, setApr] = useState(undefined);

  // average block time
  const averageBlockTime = useAverageBlockTime();

  // get pool info
  const [lptokenAddress, allocPoint, , , depositFeeBP, withdrawFeeBP] =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "poolInfo",
      args: [poolId],
    })?.value ?? [];

  // get total staked Tally
  const totalStaked =
    useCall(
      poolId === 0
        ? {
            contract: new Contract(
              MASTERCHEF_ADDRESS[chainId],
              new utils.Interface(masterchefAbi)
            ),
            method: "depositedTALLY",
            args: [],
          }
        : lptokenAddress && {
            contract: new Contract(
              lptokenAddress,
              new utils.Interface(pairAbi)
            ),
            method: "balanceOf",
            args: [MASTERCHEF_ADDRESS[chainId]],
          }
    )?.value?.[0] ?? undefined;

  // get the values of masterchef tallyperblock, staking percent, totalAllocpoint
  const tallyPerBlock =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "TALLYPerBlock",
      args: [],
    })?.value?.[0] ?? undefined;

  const totalAllocPoint =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "totalAllocPoint",
      args: [],
    })?.value?.[0] ?? undefined;

  const stakingPercent =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "stakingPercent",
      args: [],
    })?.value?.[0] ?? undefined;

  const percentDec =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "percentDec",
      args: [],
    })?.value?.[0] ?? undefined;

  // get total performance fee
  const perfFee = usePerformanceFee(chainId);

  useEffect(() => {
    if (
      allocPoint &&
      totalStaked &&
      totalAllocPoint &&
      tallyPerBlock &&
      stakingPercent &&
      percentDec &&
      withdrawFeeBP &&
      depositFeeBP &&
      perfFee &&
      totalAllocPoint.toNumber() !== 0 &&
      percentDec.toNumber() !== 0 &&
      utils.formatUnits(totalStaked, 9) !== "0"
    ) {
      setApr(
        (24 *
          3600 *
          365 *
          tallyPerBlock.toNumber() *
          allocPoint.toNumber() *
          stakingPercent.toNumber() *
          100) /
          totalAllocPoint.toNumber() /
          percentDec.toNumber() /
          utils.formatUnits(totalStaked, 0) /
          averageBlockTime -
          perfFee -
          (withdrawFeeBP + depositFeeBP) / 100
      );
    } else {
      setApr(undefined);
    }
  }, [
    allocPoint,
    totalStaked,
    totalAllocPoint,
    tallyPerBlock,
    stakingPercent,
    percentDec,
    withdrawFeeBP,
    depositFeeBP,
    perfFee,
    averageBlockTime,
  ]);

  return apr;
};

export const useTotalSupply = () => {
  return 1000000000;
};

export const useMaxSupply = () => {
  return 1000000000;
};

export const useCirculatingSupply = () => {
  return 184616125;
};

export const useBurnedAmount = () => {
  return 0;
};

export const useMarketCap = () => {
  const maxSupply = useMaxSupply();
  const tallyPrice = useTokenPrice(TALLY[BSC.chainId]);

  return maxSupply && tallyPrice ? maxSupply * tallyPrice : undefined;
};
