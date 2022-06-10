import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useEthers, useTokenBalance, useCall } from "@usedapp/core";
import { BigNumber, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

import spinningGif from "../../assets/images/gifs/Spinner-1.gif";
import ierc20Abi from "../../assets/abi/IERC20.json";
import { isTransReady } from "../../utils/transStatus";

export default function StakeModal({
  open,
  setOpen,
  performanceFee,
  avatar,
  token,
  priceUSD,
  apr,
  poolId,
  enterStaking,
  leaveStaking,
}) {
  const [amountToStake, setAmountToStake] = useState(0);
  const [tokenMax, setTokenMax] = useState(false);
  const { account } = useEthers();

  // balance
  const tokenBalance =
    useTokenBalance(token && token.address, account && account) ?? undefined;

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
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-black bg-opacity-50" />
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
            <div className="relative inline-block overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-md sm:align-middle">
              <div className="grid bg-white auto-rows-auto gap-y-4">
                <div className="flex items-center justify-between w-full p-5 text-white bg-primary-brand">
                  <h1 className="flex items-center space-x-3 text-xl font-semibold">
                    Stake {token && token.symbol}
                    <QuestionMarkCircleIcon className="w-4 h-4 ml-2 cursor-pointer" />
                  </h1>

                  <XIcon
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>

                <div className="px-5">
                  <div className="flex justify-between py-2">
                    <span className="text-md text-[#708db7]">Stake</span>
                    <span className="flex items-center text-right text-md text-primary-darkText">
                      {avatar ? (
                        <img
                          className="w-5 h-5 mr-1 rounded-full"
                          src={avatar}
                          alt="token"
                        />
                      ) : (
                        <Skeleton circle className="w-5 h-5 mr-1" />
                      )}
                      {token && token.symbol}
                    </span>
                  </div>
                  <div>
                    <div className="px-3 py-2 border rounded-lg border-slate-300 bg-slate-200">
                      <input
                        className="w-full py-2 text-right bg-transparent outline-none appearance-none no-border text-slate-700"
                        placeholder="Input Tally amount to stake"
                        type="number"
                        value={amountToStake === 0 ? "" : amountToStake}
                        onChange={(event) => {
                          setAmountToStake(event.target.value);
                          setTokenMax(false);
                        }}
                      ></input>
                      <div className="text-sm text-right text-slate-500">
                        {"~ $"}
                        {priceUSD && amountToStake
                          ? (priceUSD * amountToStake).toLocaleString(
                              undefined,
                              { minimumFractionDigits: 5 }
                            )
                          : ""}
                      </div>
                    </div>
                    <div className="flex justify-end py-1 text-sm">
                      {token && !tokenMax && tokenBalance && tokenDecimal && (
                        <button
                          className="px-1 mx-2 text-sm text-white transition-opacity duration-200 rounded-xl bg-primary-brand hover:opacity-60"
                          onClick={() => {
                            tokenBalance &&
                              tokenDecimal &&
                              setAmountToStake(
                                utils.formatUnits(tokenBalance, tokenDecimal)
                              );
                            setTokenMax(true);
                          }}
                        >
                          max
                        </button>
                      )}
                      <span className="text-slate-400">Balance</span>
                      <span className="ml-3 min-w-[10%] text-slate-600">
                        {tokenBalance && tokenDecimal ? (
                          <>
                            {parseFloat(
                              utils.formatUnits(tokenBalance, tokenDecimal)
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 9,
                            })}
                          </>
                        ) : (
                          <Skeleton classNmae="" />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between px-2 pt-4">
                    <span className="text-md text-[#708db7]">Annual ROI</span>
                    <span className="flex items-start text-md text-primary-darkText">
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
                  {poolId !== 0 && (
                    <div className="flex px-2 pt-1">
                      <span className="text-md text-[#708db7]">
                        Performance Fee
                      </span>
                      <span className="flex-1 text-right text-md text-primary-darkText">
                        {!performanceFee ? (
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
                  )}
                  <button
                    className={`${
                      (!amountToStake ||
                        parseFloat(amountToStake) === 0 ||
                        !isTransReady(enterStaking) ||
                        !isTransReady(leaveStaking)) &&
                      "disabled cursor-not-allowed opacity-80"
                    } mb-4 mt-3 flex h-12 w-full items-center justify-center rounded-lg bg-primary-brand text-xl font-semibold text-white transition-opacity duration-200 hover:opacity-80`}
                    onClick={() => {
                      if (isTransReady(enterStaking)) {
                        if (tokenMax)
                          tokenBalance && enterStaking.send(tokenBalance);
                        else
                          enterStaking.send(
                            utils.parseUnits(amountToStake, tokenDecimal)
                          );
                      }
                    }}
                    disabled={
                      !amountToStake ||
                      parseFloat(amountToStake) === 0 ||
                      !isTransReady(enterStaking) ||
                      !isTransReady(leaveStaking)
                    }
                  >
                    {(!isTransReady(enterStaking) ||
                      !isTransReady(leaveStaking)) && (
                      <img
                        className="w-6 h-6 mr-2 rounded-full"
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
