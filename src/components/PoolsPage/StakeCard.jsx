import { useState, useEffect } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import { FaWallet, FaRecycle, FaPlus, FaMinus } from "react-icons/fa";
import { useEthers, useCall, useContractFunction } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { utils, BigNumber } from "ethers";
import toast from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import ReactTooltip from "react-tooltip";
import { CalculatorIcon } from "@heroicons/react/outline";

import Web3ConnectModal from "../../components/shared/Web3ConnectModal";

import {
  MASTERCHEF_ADDRESS,
  RANDOM_ADDRESS,
} from "../../assets/data/addresses.js";
import {
  BSCSCAN_ADDRESS_URL,
  PANCAKESWAP_API_URL,
} from "../../assets/data/urls";
import masterchefAbi from "../../assets/abi/Masterchef.json";
import ierc20Abi from "../../assets/abi/IERC20.json";
import pairAbi from "../../assets/abi/TallyswapPair.json";
import StakeModal from "../shared/StakeModal";

import { spinningGif } from "../../assets/data/images";
import { poolMetaInfos } from "../../assets/data/pools";
import { isTransReady } from "../../utils/transStatus";
import { supportedTokens } from "../../assets/data/tokens";
import axios from "axios";
import { useSelector } from "react-redux";
import UnstakeModal from "../shared/UnstakeModal";

const StakeCard = ({
  tallyPerBlock,
  totalAllocPoint,
  stakingPercent,
  percentDec,
  reserveFee,
  buyBackFee,
  maintenanceSecurityFee,
  operationFee,
  poolId,
  showAprModal,
  setAprModalValue,
}) => {
  const { account, chainId } = useEthers();

  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [stakeModalOpen, setStakeModalOpen] = useState(false);
  const [unstakeModalOpen, setUnstakeModalOpen] = useState(false);
  const [token, setToken] = useState();
  const [apr, setApr] = useState(undefined);
  const [priceUSD, setPriceUSD] = useState(0);

  const tallyPrice = useSelector((state) => state?.tokenPrice?.tally);

  const averageBlockTime = 3;

  // get pool info
  const [lptokenAddress, allocPoint] =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "poolInfo",
      args: [poolId],
    })?.value ?? [];

  // get user info
  const [stakedAmount] =
    useCall(
      account && {
        contract: new Contract(
          MASTERCHEF_ADDRESS[chainId],
          new utils.Interface(masterchefAbi)
        ),
        method: "userInfo",
        args: [poolId, account],
      }
    )?.value ?? [];

  // token decimals
  const tokenDecimal =
    (
      useCall(
        lptokenAddress && {
          contract: new Contract(lptokenAddress, ierc20Abi),
          method: "decimals",
          args: [],
        }
      ) ?? {}
    )?.value?.[0] ?? undefined;

  // tally token allowance from wallet address to mastedchef
  const tokenAllowance =
    (
      useCall(
        account &&
          lptokenAddress && {
            contract: new Contract(lptokenAddress, ierc20Abi),
            method: "allowance",
            args: [account, MASTERCHEF_ADDRESS[chainId]],
          }
      ) ?? {}
    )?.value?.[0] ?? undefined;

  // get current profit
  const pendingTally =
    useCall(
      account && {
        contract: new Contract(
          MASTERCHEF_ADDRESS[chainId],
          new utils.Interface(masterchefAbi)
        ),
        method: "pendingTALLY",
        args: [poolId, account],
      }
    )?.value?.[0] ?? BigNumber.from(0);

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

  // approve functions
  const approveToken = useContractFunction(
    new Contract(lptokenAddress ? lptokenAddress : RANDOM_ADDRESS, ierc20Abi),
    "approve",
    {
      transactionName: "Approve",
    }
  );

  // enable functions own definition
  const enableToken = async () => {
    await approveToken.send(
      MASTERCHEF_ADDRESS[chainId],
      BigNumber.from(2).pow(256).sub(1)
    );
  };

  // staking function
  const enterStaking = useContractFunction(
    new Contract(MASTERCHEF_ADDRESS[chainId], masterchefAbi),
    "enterStaking",
    {
      transactionName: "Stake",
    }
  );

  // unstaking function
  const leaveStaking = useContractFunction(
    new Contract(MASTERCHEF_ADDRESS[chainId], masterchefAbi),
    "leaveStaking",
    {
      transactionName: "Unstake",
    }
  );

  // side effect for account change
  useEffect(() => {
    if (account) setConnectModalOpen(false);
  }, [account]);

  // side effect for approve token action status change
  useEffect(() => {
    if (approveToken.state.status === "Success")
      toast.success("You can stake this token now.");
    if (approveToken.state.status === "Exception")
      toast.error("An error occured during giving permissions.");
  }, [approveToken.state.status]);

  // side effect for lptokenAddress change
  useEffect(() => {
    if (lptokenAddress !== undefined) {
      setToken(
        supportedTokens[chainId].find((t) => t.address === lptokenAddress)
      );
    }
  }, [lptokenAddress, chainId]);

  // side effect for getting token price in USD
  useEffect(() => {
    const chainToken = supportedTokens[chainId].find(
      (token) => token.address === lptokenAddress
    );
    const mainNetToken =
      chainToken &&
      supportedTokens["56"].find((token1) => token1.name === chainToken.name);
    mainNetToken &&
      axios(PANCAKESWAP_API_URL + mainNetToken.address).then((resp) => {
        if (resp && resp.data) setPriceUSD(parseFloat(resp.data.data.price));
      });
  });

  // side effect for apy change
  useEffect(() => {
    if (
      allocPoint &&
      totalStaked &&
      totalAllocPoint &&
      tallyPerBlock &&
      stakingPercent &&
      percentDec &&
      totalAllocPoint.toNumber() !== 0 &&
      percentDec.toNumber() !== 0 &&
      totalStaked.toNumber() !== 0
    ) {
      setApr(
        (
          (24 *
            3600 *
            365 *
            tallyPerBlock.toNumber() *
            allocPoint.toNumber() *
            stakingPercent.toNumber() *
            100) /
          totalAllocPoint.toNumber() /
          percentDec.toNumber() /
          totalStaked.toNumber() /
          averageBlockTime
        ).toFixed(2)
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
  ]);

  // side effect for stakin/unstaking token action status change
  useEffect(() => {
    if (enterStaking.state.status === "Success") {
      toast.success("You staked tokens.");
      enterStaking.resetState();
    }
    if (enterStaking.state.status === "Exception") {
      toast.error("An error occured during staking tokens.");
      enterStaking.resetState();
    }
  }, [enterStaking]);

  useEffect(() => {
    if (leaveStaking.state.status === "Success") {
      toast.success("You unstaked tokens.");
      leaveStaking.resetState();
    }
    if (leaveStaking.state.status === "Exception") {
      toast.error("An error occured during unstaking tokens.");
      leaveStaking.resetState();
    }
  }, [leaveStaking]);

  return (
    <div className="flex flex-col p-6 bg-white rounded-2xl">
      <div className="flex flex-row space-x-5 border-b-2 border-[#708eb7]/10 pb-4">
        <figure className="relative inline-block w-20 h-20">
          {!poolMetaInfos ||
          !poolMetaInfos[poolId] ||
          !poolMetaInfos[poolId].logo ? (
            <Skeleton circle className="w-full h-full" />
          ) : (
            <img src={poolMetaInfos[poolId].logo} alt="token" />
          )}
          <span className="absolute block w-8 h-8 transform translate-x-1/2 translate-y-1/2 border-2 border-white rounded-full bottom-2 right-2">
            {!poolMetaInfos ||
            !poolMetaInfos[poolId] ||
            !poolMetaInfos[poolId].logo ? (
              <Skeleton circle className="w-full h-full" />
            ) : (
              <img
                className="rounded-full"
                src={poolMetaInfos[poolId].avatar}
                alt="token"
              />
            )}
          </span>
        </figure>
        <div className="flex flex-col space-y-2 ">
          <h3 className="text-lg font-semibold text-primary-darkText">
            {!poolMetaInfos ||
            !poolMetaInfos[poolId] ||
            !poolMetaInfos[poolId].title ? (
              <Skeleton className="w-full h-full" />
            ) : (
              poolMetaInfos[poolId].title
            )}
          </h3>
          <h4 className="text-xs font-semibold text-[#444444]">
            {!poolMetaInfos ||
            !poolMetaInfos[poolId] ||
            !poolMetaInfos[poolId].subscription ? (
              <Skeleton className="w-full h-full" />
            ) : (
              poolMetaInfos[poolId].subscription
            )}
          </h4>
          <div className="flex font-medium truncate text-md text-primary-brand">
            <span className="pr-4">APR</span>
            {!apr ? (
              <Skeleton className="w-20" />
            ) : (
              <span
                onClick={() => {
                  setAprModalValue(apr);
                  showAprModal(true);
                }}
                className="flex cursor-pointer"
              >
                {apr.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                {"%"}
                <CalculatorIcon className="w-5 h-5" />
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="py-4">
        {account ? (
          <>
            {!tokenAllowance ? (
              <button className="flex items-center justify-center w-full h-12 px-6 font-semibold text-white transition-opacity duration-200 rounded-lg cursor-not-allowed disabled bg-primary-brand opacity-80 hover:opacity-80">
                <img
                  className="w-6 h-6 mr-2 rounded-full"
                  src={spinningGif}
                  alt="waiting"
                />
                Loading
              </button>
            ) : (
              <>
                {BigNumber.from(2).pow(128).gt(tokenAllowance) ? (
                  <button
                    className={`${
                      !isTransReady(approveToken) &&
                      "disabled cursor-not-allowed opacity-80"
                    } flex h-12 w-full items-center justify-center rounded-lg bg-primary-brand px-6 font-semibold text-white transition-opacity duration-200 hover:opacity-80`}
                    onClick={
                      !isTransReady(approveToken) ? () => {} : enableToken
                    }
                  >
                    {!isTransReady(approveToken) ? (
                      <img
                        className="w-6 h-6 mr-2 rounded-full"
                        src={spinningGif}
                        alt="waiting"
                      />
                    ) : (
                      <span className="block mr-2 border border-white rounded-full">
                        <img
                          className="w-6 h-6 rounded-full"
                          src={poolMetaInfos[poolId].logo}
                          alt="token"
                        />
                      </span>
                    )}
                    Enable
                  </button>
                ) : (
                  <>
                    <div className="mb-3">
                      <div className="text-md text-[#708db7]">You staked</div>
                      <div className="flex flex-row items-center overflow-hidden gap-x-4">
                        <div className="items-center h-12 overflow-hidden truncate sm:basis-full md:basis-1/2">
                          <div className="text-xl font-bold text-black">
                            {stakedAmount && tokenDecimal ? (
                              parseFloat(
                                utils.formatUnits(stakedAmount, tokenDecimal)
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 4,
                              })
                            ) : (
                              <Skeleton />
                            )}
                          </div>
                          <div className="text-sm text-slate-400">
                            {stakedAmount && tokenDecimal && priceUSD ? (
                              <>
                                ${""}
                                {(
                                  parseFloat(
                                    utils.formatUnits(
                                      stakedAmount,
                                      tokenDecimal
                                    )
                                  ) * priceUSD
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 4,
                                })}
                              </>
                            ) : (
                              <Skeleton />
                            )}
                          </div>
                        </div>
                        <div className="flex items-center h-12 overflow-hidden truncate gap-x-2 sm:basis-full md:basis-1/2">
                          <button
                            className={`${
                              !isTransReady(enterStaking) ||
                              !isTransReady(leaveStaking)
                                ? "disabled cursor-not-allowed opacity-80"
                                : "transition-opacity duration-200 hover:opacity-80"
                            } flex h-12 w-full items-center justify-center rounded-lg bg-primary-brand px-2 font-semibold text-white sm:basis-full md:basis-1/2`}
                            data-tip
                            data-for="StakeTooltip"
                            onClick={() => setStakeModalOpen(true)}
                          >
                            <FaPlus />
                          </button>
                          <ReactTooltip
                            id="StakeTooltip"
                            place="top"
                            effect="solid"
                          >
                            Stake
                          </ReactTooltip>
                          <button
                            className={`${
                              !isTransReady(enterStaking) ||
                              !isTransReady(leaveStaking)
                                ? "disabled cursor-not-allowed opacity-80"
                                : "transition-opacity duration-200 hover:opacity-80"
                            } flex h-12 w-full items-center justify-center rounded-lg bg-primary-brand px-2 font-semibold text-white sm:basis-full md:basis-1/2`}
                            data-tip
                            data-for="UnstakeTooltip"
                            onClick={() => setUnstakeModalOpen(true)}
                          >
                            <FaMinus />
                            <ReactTooltip
                              id="UnstakeTooltip"
                              place="top"
                              effect="solid"
                            >
                              Unstake
                            </ReactTooltip>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-md text-[#708db7]">Tally profit</div>
                      <div className="flex flex-row items-center overflow-hidden gap-x-4">
                        <div className="items-center h-12 overflow-hidden truncate sm:basis-full md:basis-1/2">
                          <div
                            className={`text-xl font-bold ${
                              pendingTally &&
                              parseFloat(utils.formatUnits(pendingTally, 9)) ===
                                0
                                ? `text-slate-500`
                                : `text-green-500`
                            }`}
                          >
                            {pendingTally ? (
                              parseFloat(
                                utils.formatUnits(pendingTally, 9)
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 4,
                              })
                            ) : (
                              <Skeleton />
                            )}
                          </div>
                          <div className="text-sm text-slate-400">
                            {pendingTally && tallyPrice ? (
                              <>
                                ${""}
                                {(
                                  parseFloat(
                                    utils.formatUnits(pendingTally, 9)
                                  ) * tallyPrice
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 4,
                                })}
                              </>
                            ) : (
                              <Skeleton />
                            )}
                          </div>
                        </div>
                        <div className="flex items-center h-12 overflow-hidden truncate gap-x-2 sm:basis-full md:basis-1/2">
                          <button
                            className={`${
                              parseFloat(utils.formatUnits(pendingTally, 9)) ===
                                0 ||
                              !isTransReady(enterStaking) ||
                              !isTransReady(leaveStaking)
                                ? "disabled cursor-not-allowed opacity-80"
                                : "transition-opacity duration-200 hover:opacity-80"
                            } flex h-12 w-full items-center justify-center rounded-lg bg-primary-brand px-2 font-semibold text-white sm:basis-full md:basis-1/2`}
                            data-tip
                            data-for="HarvestTip"
                            onClick={() => {
                              if (isTransReady(enterStaking)) {
                                enterStaking.send(0);
                              }
                            }}
                          >
                            {!isTransReady(enterStaking) ||
                            !isTransReady(leaveStaking) ? (
                              <img
                                className="w-6 h-6 rounded-full"
                                src={spinningGif}
                                alt="Harvesting"
                              />
                            ) : (
                              <FaWallet />
                            )}
                            <ReactTooltip
                              id="HarvestTip"
                              place="top"
                              effect="solid"
                            >
                              Harvest
                            </ReactTooltip>
                          </button>
                          <button
                            className={`${
                              parseFloat(utils.formatUnits(pendingTally, 9)) ===
                                0 ||
                              !isTransReady(enterStaking) ||
                              !isTransReady(leaveStaking)
                                ? "disabled cursor-not-allowed opacity-80"
                                : "transition-opacity duration-200 hover:opacity-80"
                            } flex h-12 w-full items-center justify-center rounded-lg bg-primary-brand px-2 font-semibold text-white sm:basis-full md:basis-1/2`}
                            data-tip
                            data-for="CompoundTip"
                            onClick={() => {
                              if (isTransReady(enterStaking)) {
                                enterStaking.send(pendingTally);
                              }
                            }}
                          >
                            {!isTransReady(enterStaking) ||
                            !isTransReady(leaveStaking) ? (
                              <img
                                className="w-6 h-6 rounded-full"
                                src={spinningGif}
                                alt="Compounding"
                              />
                            ) : (
                              <FaRecycle />
                            )}
                            <ReactTooltip
                              id="CompoundTip"
                              place="top"
                              effect="solid"
                            >
                              Compound
                            </ReactTooltip>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <button
            className="flex items-center justify-center w-full h-12 px-6 font-semibold text-white transition-opacity duration-200 rounded-lg bg-primary-brand hover:opacity-80"
            onClick={() => setConnectModalOpen(true)}
          >
            Connect Wallet
          </button>
        )}
      </div>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-center px-4 py-2 mx-auto font-semibold text-primary-brand">
              <span>{open ? "Hide" : "Details"}</span>
              <ChevronDownIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-6 w-6 text-primary-brand`}
              />
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-300 transform"
              enterFrom="-translate-y-2 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transition ease-in duration-100"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="-translate-y-2 opacity-0"
            >
              <Disclosure.Panel className="pt-2 pb-2 space-y-2 text-xs text-gray-500">
                <div className="flex">
                  <span className="text-sm text-[#708db7]">Total Stake</span>
                  <div className="flex-1 border-b border-dotted border-[#708db7]"></div>
                  <span className="text-sm text-primary-darkText">
                    {totalStaked && tokenDecimal ? (
                      parseFloat(
                        utils.formatUnits(totalStaked, tokenDecimal)
                      ).toLocaleString(undefined, { minimumFractionDigits: 2 })
                    ) : (
                      <Skeleton className="w-20" />
                    )}
                  </span>
                </div>
                {poolId !== 0 && (
                  <div className="flex">
                    <span className="text-sm text-[#708db7]">
                      Performance Fee
                    </span>
                    <div className="flex-1 border-b border-dotted border-[#708db7]"></div>
                    <span className="text-sm text-primary-darkText">
                      {reserveFee &&
                      operationFee &&
                      maintenanceSecurityFee &&
                      buyBackFee &&
                      percentDec &&
                      percentDec.toNumber() !== 0 ? (
                        (
                          ((reserveFee.toNumber() +
                            operationFee.toNumber() +
                            maintenanceSecurityFee.toNumber() +
                            buyBackFee.toNumber()) /
                            percentDec.toNumber()) *
                          100
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })
                      ) : (
                        <Skeleton className="w-20" />
                      )}
                      {"%"}
                    </span>
                  </div>
                )}
                <a
                  href={`${BSCSCAN_ADDRESS_URL[chainId]}${MASTERCHEF_ADDRESS[chainId]}`}
                  className="flex items-center pt-2 space-x-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-base text-primary-brand">
                    View Contact
                  </span>
                  <ExternalLinkIcon className="w-6 h-6 ml-2 text-primary-brand" />
                </a>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      <Web3ConnectModal open={connectModalOpen} setOpen={setConnectModalOpen} />
      <StakeModal
        open={stakeModalOpen}
        setOpen={setStakeModalOpen}
        performanceFee={
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
        }
        token={token}
        avatar={poolMetaInfos[poolId].logo}
        priceUSD={priceUSD}
        apr={apr}
        poolId={poolId}
        enterStaking={enterStaking}
        leaveStaking={leaveStaking}
      />
      <UnstakeModal
        open={unstakeModalOpen}
        setOpen={setUnstakeModalOpen}
        performanceFee={
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
        }
        token={token}
        avatar={poolMetaInfos[poolId].logo}
        priceUSD={priceUSD}
        apr={apr}
        poolId={poolId}
        stakedAmount={stakedAmount}
        enterStaking={enterStaking}
        leaveStaking={leaveStaking}
      />
    </div>
  );
};

export default StakeCard;
