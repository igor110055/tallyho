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
import { MdOutlineCalculate } from "react-icons/md";

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
import { useAPR } from "../../hooks";

const StakeCard = ({ poolId, perfFee, showAprModal, setAprModalValue }) => {
  const { account, chainId } = useEthers();

  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [stakeModalOpen, setStakeModalOpen] = useState(false);
  const [unstakeModalOpen, setUnstakeModalOpen] = useState(false);
  const [token, setToken] = useState();
  const [priceUSD, setPriceUSD] = useState(0);

  const tallyPrice = useSelector((state) => state?.tokenPrice?.tally);
  const apr = useAPR(poolId, chainId);

  // get pool info
  const [lptokenAddress, , , , depositFeeBP, withdrawFeeBP] =
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
    )?.value?.[0] ?? undefined;

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
    <div className="flex flex-col rounded-2xl bg-white p-6">
      <div className="flex flex-row space-x-5 border-b-2 border-[#708eb7]/10 pb-4">
        <figure className="relative inline-block h-20 w-20">
          {!poolMetaInfos ||
          !poolMetaInfos[poolId] ||
          !poolMetaInfos[poolId].logo ? (
            <Skeleton circle className="h-full w-full" />
          ) : (
            <img src={poolMetaInfos[poolId].logo} alt="token" />
          )}
          <span className="absolute bottom-2 right-2 block h-8 w-8 translate-x-1/2 translate-y-1/2 transform rounded-full border-2 border-white">
            {!poolMetaInfos ||
            !poolMetaInfos[poolId] ||
            !poolMetaInfos[poolId].logo ? (
              <Skeleton circle className="h-full w-full" />
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
              <Skeleton className="h-full w-full" />
            ) : (
              poolMetaInfos[poolId].title
            )}
          </h3>
          <h4 className="text-xs font-semibold text-[#444444]">
            {!poolMetaInfos ||
            !poolMetaInfos[poolId] ||
            !poolMetaInfos[poolId].subscription ? (
              <Skeleton className="h-full w-full" />
            ) : (
              poolMetaInfos[poolId].subscription
            )}
          </h4>
          <div className="text-md align-center flex truncate font-medium text-primary-brand">
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
                {apr.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                {"%"}
                <MdOutlineCalculate className="h-5 w-5" />
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="py-4">
        {account ? (
          <>
            {!tokenAllowance ? (
              <button className="disabled flex h-12 w-full cursor-not-allowed items-center justify-center rounded-lg bg-primary-brand px-6 font-semibold text-white opacity-80 transition-opacity duration-200 hover:opacity-80">
                <img
                  className="mr-2 h-6 w-6 rounded-full"
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
                        className="mr-2 h-6 w-6 rounded-full"
                        src={spinningGif}
                        alt="waiting"
                      />
                    ) : (
                      <span className="mr-2 block rounded-full border border-white">
                        <img
                          className="h-6 w-6 rounded-full"
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
                      <div className="flex flex-row items-center gap-x-4 overflow-hidden">
                        <div className="h-12 items-center overflow-hidden truncate sm:basis-full md:basis-1/2">
                          <div className="text-xl font-bold text-black">
                            {stakedAmount && tokenDecimal ? (
                              parseFloat(
                                utils.formatUnits(stakedAmount, tokenDecimal)
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 4,
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
                                  maximumFractionDigits: 4,
                                })}
                              </>
                            ) : (
                              <Skeleton />
                            )}
                          </div>
                        </div>
                        <div className="flex h-12 items-center gap-x-2 overflow-hidden truncate sm:basis-full md:basis-1/2">
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
                      <div className="flex flex-row items-center gap-x-4 overflow-hidden">
                        <div className="h-12 items-center overflow-hidden truncate sm:basis-full md:basis-1/2">
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
                                maximumFractionDigits: 4,
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
                                  maximumFractionDigits: 4,
                                })}
                              </>
                            ) : (
                              <Skeleton />
                            )}
                          </div>
                        </div>
                        <div className="flex h-12 items-center gap-x-2 overflow-hidden truncate sm:basis-full md:basis-1/2">
                          <button
                            className={`${
                              !pendingTally ||
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
                            disabled={
                              !pendingTally ||
                              parseFloat(utils.formatUnits(pendingTally, 9)) ===
                                0 ||
                              !isTransReady(enterStaking) ||
                              !isTransReady(leaveStaking)
                            }
                          >
                            {!isTransReady(enterStaking) ||
                            !isTransReady(leaveStaking) ? (
                              <img
                                className="h-6 w-6 rounded-full"
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
                              !pendingTally ||
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
                            disabled={
                              !pendingTally ||
                              parseFloat(utils.formatUnits(pendingTally, 9)) ===
                                0 ||
                              !isTransReady(enterStaking) ||
                              !isTransReady(leaveStaking)
                            }
                          >
                            {!isTransReady(enterStaking) ||
                            !isTransReady(leaveStaking) ? (
                              <img
                                className="h-6 w-6 rounded-full"
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
            className="flex h-12 w-full items-center justify-center rounded-lg bg-primary-brand px-6 font-semibold text-white transition-opacity duration-200 hover:opacity-80"
            onClick={() => setConnectModalOpen(true)}
          >
            Connect Wallet
          </button>
        )}
      </div>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="mx-auto flex items-center justify-center px-4 py-2 font-semibold text-primary-brand">
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
              <Disclosure.Panel className="space-y-2 pt-2 pb-2 text-xs text-gray-500">
                <div className="flex">
                  <span className="text-sm text-[#708db7]">Total Stake</span>
                  <div className="flex-1 border-b border-dotted border-[#708db7]"></div>
                  <span className="text-sm text-primary-darkText">
                    {totalStaked && tokenDecimal ? (
                      parseFloat(
                        utils.formatUnits(totalStaked, tokenDecimal)
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })
                    ) : (
                      <Skeleton className="w-20" />
                    )}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-sm text-[#708db7]">
                    Performance Fee
                  </span>
                  <div className="flex-1 border-b border-dotted border-[#708db7]"></div>
                  <span className="text-sm text-primary-darkText">
                    {perfFee ? (
                      perfFee.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }) + "%"
                    ) : (
                      <Skeleton className="w-20" />
                    )}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-sm text-[#708db7]">Staking Fee</span>
                  <div className="flex-1 border-b border-dotted border-[#708db7]"></div>
                  <span className="text-sm text-primary-darkText">
                    {depositFeeBP !== undefined ? (
                      (depositFeeBP / 100).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }) + "%"
                    ) : (
                      <Skeleton className="w-20" />
                    )}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-sm text-[#708db7]">Unstaking Fee</span>
                  <div className="flex-1 border-b border-dotted border-[#708db7]"></div>
                  <span className="text-sm text-primary-darkText">
                    {withdrawFeeBP !== undefined ? (
                      (withdrawFeeBP / 100).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }) + "%"
                    ) : (
                      <Skeleton className="w-20" />
                    )}
                  </span>
                </div>
                <a
                  href={`${BSCSCAN_ADDRESS_URL[chainId]}${MASTERCHEF_ADDRESS[chainId]}`}
                  className="flex items-center space-x-1 pt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-base text-primary-brand">
                    View Contract
                  </span>
                  <ExternalLinkIcon className="ml-2 h-6 w-6 text-primary-brand" />
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
        performanceFee={perfFee}
        depositFeeBP={depositFeeBP}
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
        performanceFee={perfFee}
        withdrawFeeBP={withdrawFeeBP}
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
