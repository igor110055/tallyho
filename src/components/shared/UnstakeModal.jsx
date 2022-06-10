import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useEthers, useCall } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

import spinningGif from "../../assets/images/gifs/Spinner-1.gif";
import ierc20Abi from "../../assets/abi/IERC20.json";
import { isTransReady } from "../../utils/transStatus";

export default function UnstakeModal({
  open,
  setOpen,
  performanceFee,
  withdrawFeeBP,
  avatar,
  token,
  priceUSD,
  apr,
  poolId,
  stakedAmount,
  enterStaking,
  leaveStaking,
}) {
  const [amountToUnStake, setAmountToUnStake] = useState(0);
  const [tokenMax, setTokenMax] = useState(false);
  const { account } = useEthers();

  // token decimals
  const tokenDecimal =
    (
      useCall(
        token && {
          contract: new Contract(token.address, ierc20Abi),
          method: "decimals",
          args: [],
        }
      ) ?? {}
    ).value?.[0] ?? undefined;

  // side effects for account change
  useEffect(() => {
    if (!account) setOpen(false);
  }, [account, setOpen]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block transform overflow-hidden rounded-lg text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:align-middle">
              <div className="grid auto-rows-auto gap-y-4 bg-white">
                <div className="flex w-full items-center justify-between bg-primary-brand p-5 text-white">
                  <h1 className="flex items-center space-x-3 text-xl font-semibold">
                    Unstake {token && token.symbol}
                    <QuestionMarkCircleIcon className="ml-2 h-4 w-4 cursor-pointer" />
                  </h1>

                  <XIcon
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>

                <div className="px-5">
                  <div className="flex justify-between py-2">
                    <span className="text-md text-[#708db7]">Unstake</span>
                    <span className="text-md flex items-center text-right text-primary-darkText">
                      {avatar ? (
                        <img
                          className="mr-1 h-5 w-5 rounded-full"
                          src={avatar}
                          alt="token"
                        />
                      ) : (
                        <Skeleton circle className="mr-1 h-5 w-5" />
                      )}
                      {token && token.symbol}
                    </span>
                  </div>
                  <div>
                    <div className="rounded-lg border border-slate-300 bg-slate-200 px-3 py-2">
                      <input
                        className="no-border w-full appearance-none bg-transparent py-2 text-right text-slate-700 outline-none"
                        placeholder="Input Tally amount to stake"
                        type="number"
                        value={amountToUnStake === 0 ? "" : amountToUnStake}
                        onChange={(event) => {
                          setAmountToUnStake(event.target.value);
                          setTokenMax(false);
                        }}
                      ></input>
                      <div className="text-right text-sm text-slate-500">
                        {"~ $"}
                        {priceUSD && amountToUnStake
                          ? (priceUSD * amountToUnStake).toLocaleString(
                              undefined,
                              { minimumFractionDigits: 5 }
                            )
                          : ""}
                      </div>
                    </div>
                    <div className="py-1 text-right text-sm">
                      {stakedAmount && tokenDecimal && token && !tokenMax && (
                        <button
                          className="mx-2 rounded-xl bg-primary-brand px-1 text-sm text-white transition-opacity duration-200 hover:opacity-60"
                          onClick={() => {
                            stakedAmount &&
                              tokenDecimal &&
                              setAmountToUnStake(
                                utils.formatUnits(stakedAmount, tokenDecimal)
                              );
                            setTokenMax(true);
                          }}
                        >
                          max
                        </button>
                      )}
                      <span className="text-slate-400">You staked</span>
                      <span className="ml-3 text-slate-600">
                        {stakedAmount && tokenDecimal ? (
                          <>
                            {parseFloat(
                              utils.formatUnits(stakedAmount, tokenDecimal)
                            ).toLocaleString()}
                          </>
                        ) : (
                          <Skeleton width="50" />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between px-2 pt-4">
                    <span className="text-md text-[#708db7]">Annual ROI</span>
                    <span className="text-md flex items-start text-primary-darkText">
                      {!apr ? (
                        <Skeleton className="w-20" />
                      ) : (
                        <>
                          {apr.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                          {"%"}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex px-2 pt-1">
                    <span className="text-md text-[#708db7]">
                      Performance Fee
                    </span>
                    <span className="text-md flex-1 text-right text-primary-darkText">
                      {performanceFee === undefined ? (
                        <Skeleton className="w-20" />
                      ) : (
                        <>
                          {performanceFee.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                          {"%"}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex px-2 pt-1">
                    <span className="text-md text-[#708db7]">
                      Unstaking Fee
                    </span>
                    <span className="text-md flex-1 text-right text-primary-darkText">
                      {withdrawFeeBP === undefined ? (
                        <Skeleton className="w-20" />
                      ) : (
                        <>
                          {(withdrawFeeBP / 100).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                          {"%"}
                        </>
                      )}
                    </span>
                  </div>
                  <button
                    className={`${
                      (!amountToUnStake ||
                        parseFloat(amountToUnStake) === 0 ||
                        !isTransReady(leaveStaking) ||
                        !isTransReady(enterStaking)) &&
                      "disabled cursor-not-allowed opacity-80"
                    } mb-4 mt-3 flex h-12 w-full items-center justify-center rounded-lg bg-primary-brand text-xl font-semibold text-white transition-opacity duration-200 hover:opacity-80`}
                    onClick={() => {
                      if (isTransReady(leaveStaking)) {
                        if (tokenMax)
                          stakedAmount && leaveStaking.send(stakedAmount);
                        else
                          leaveStaking.send(
                            utils.parseUnits(amountToUnStake, tokenDecimal)
                          );
                      }
                    }}
                    disabled={
                      !amountToUnStake ||
                      parseFloat(amountToUnStake) === 0 ||
                      !isTransReady(enterStaking) ||
                      !isTransReady(leaveStaking)
                    }
                  >
                    {(!isTransReady(enterStaking) ||
                      !isTransReady(leaveStaking)) && (
                      <img
                        className="mr-2 h-6 w-6 rounded-full"
                        src={spinningGif}
                        alt="waiting"
                      />
                    )}
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
