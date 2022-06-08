import { useCall, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { utils, BigNumber } from "ethers";

import { StakeCard, StakeTokensCard } from "../../components";
import { MASTERCHEF_ADDRESS } from "../../assets/data/addresses.js";
import masterchefAbi from "../../assets/abi/Masterchef.json";
// import AutoCompoundCard from "../../components/PoolsPage/AutoCompoundCard";

const CardsSection = ({ stakeType }) => {
  const { chainId } = useEthers();

  // get the values of masterchef tallyperblock, staking percent, totalAllocpoint
  const tallyPerBlock =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "TALLYPerBlock",
      args: [],
    })?.value?.[0] ?? BigNumber.from(0);

  const totalAllocPoint =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "totalAllocPoint",
      args: [],
    })?.value?.[0] ?? BigNumber.from(0);

  const stakingPercent =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "stakingPercent",
      args: [],
    })?.value?.[0] ?? BigNumber.from(0);

  const percentDec =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "percentDec",
      args: [],
    })?.value?.[0] ?? BigNumber.from(0);

  const poolLength =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "poolLength",
      args: [],
    })?.value?.[0] ?? BigNumber.from(0);

  // get total performance fee
  const reserveFee =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "reservPercent",
      args: [],
    })?.value?.[0] ?? BigNumber.from(0);

  const maintenanceSecurityFee =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "maintenanceSecurityPercent",
      args: [],
    })?.value?.[0] ?? BigNumber.from(0);

  const buyBackFee =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "buyBackReservesPercent",
      args: [],
    })?.value?.[0] ?? BigNumber.from(0);

  const operationFee =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "operationManagerPercent",
      args: [],
    })?.value?.[0] ?? BigNumber.from(0);

  return (
    <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {stakeType === "stake_tally" &&
        Array.from({ length: poolLength }, (x, i) => {
          return (
            <StakeCard
              key={i}
              tallyPerBlock={tallyPerBlock}
              totalAllocPoint={totalAllocPoint}
              stakingPercent={stakingPercent}
              percentDec={percentDec}
              poolId={i}
              reserveFee={reserveFee}
              maintenanceSecurityFee={maintenanceSecurityFee}
              buyBackFee={buyBackFee}
              operationFee={operationFee}
            />
          );
        })}
      {stakeType === "stake_tokens" && <StakeTokensCard />}
    </div>
  );
};

export default CardsSection;
