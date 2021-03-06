import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { useEthers } from "@usedapp/core";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

export default function AprModal({ open, setOpen, aprValue }) {
  const { account } = useEthers();
  const tallyPrice = useSelector((state) => state?.tokenPrice?.tally);

  // tally amount
  const initialAmount = 1000;

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
                    APR
                    <QuestionMarkCircleIcon className="ml-2 h-4 w-4 cursor-pointer" />
                  </h1>
                  <XIcon
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <div className="mx-6">
                  <div className="text-sm text-slate-500">
                    These values are calculated based on current rates. Rates
                    are estimates provided for your convenience only, and by no
                    means represent guaranteed returns.
                  </div>
                  <table className="my-4 mb-10 w-full table-auto border-collapse text-sm">
                    <thead>
                      <tr>
                        <th className="border-b px-2 py-2 text-left font-medium text-slate-600 dark:border-slate-600 dark:text-slate-200">
                          Time Elapsed
                        </th>
                        <th className="border-b px-2 py-2 text-left font-medium text-slate-600 dark:border-slate-600 dark:text-slate-200">
                          ROI
                        </th>
                        <th className="border-b px-2 py-2 text-left font-medium text-slate-600 dark:border-slate-600 dark:text-slate-200">
                          TALLY per {initialAmount.toLocaleString()} TALLY
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-400">
                      <tr className="bg-slate-100 dark:bg-slate-900">
                        <td className="p-2">1 day</td>
                        <td className="p-2">
                          {!aprValue ? (
                            <Skeleton className="w-full" />
                          ) : (
                            <>
                              {(aprValue / 365).toLocaleString(undefined, {
                                maximumFractionDigits: 3,
                              })}
                              {"%"}
                            </>
                          )}
                        </td>
                        <td className="p-2">
                          <p>
                            {!aprValue ? (
                              <Skeleton className="w-full" />
                            ) : (
                              <>
                                {(
                                  (aprValue * initialAmount) /
                                  36500
                                ).toLocaleString(undefined, {
                                  maximumFractionDigits: 5,
                                })}
                              </>
                            )}
                          </p>
                          <p className="text-slate-500">
                            {!aprValue ? (
                              <Skeleton className="w-full" />
                            ) : (
                              <>
                                {"$"}
                                {(
                                  (aprValue * initialAmount * tallyPrice) /
                                  36500
                                ).toLocaleString(undefined, {
                                  maximumFractionDigits: 5,
                                })}
                              </>
                            )}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2">7 days</td>
                        <td className="p-2">
                          {!aprValue ? (
                            <Skeleton className="w-full" />
                          ) : (
                            <>
                              {((aprValue * 7) / 365).toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 3,
                                }
                              )}
                              {"%"}
                            </>
                          )}
                        </td>
                        <td className="p-2">
                          <p>
                            {!aprValue ? (
                              <Skeleton className="w-full" />
                            ) : (
                              <>
                                {(
                                  (aprValue * initialAmount * 7) /
                                  36500
                                ).toLocaleString(undefined, {
                                  maximumFractionDigits: 5,
                                })}
                              </>
                            )}
                          </p>
                          <p className="text-slate-500">
                            {!aprValue ? (
                              <Skeleton className="w-full" />
                            ) : (
                              <>
                                {"$"}
                                {(
                                  (aprValue * initialAmount * tallyPrice * 7) /
                                  36500
                                ).toLocaleString(undefined, {
                                  maximumFractionDigits: 5,
                                })}
                              </>
                            )}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-slate-100 dark:bg-slate-900">
                        <td className="p-2">30 days</td>
                        <td className="p-2">
                          {!aprValue ? (
                            <Skeleton className="w-full" />
                          ) : (
                            <>
                              {((aprValue * 30) / 365).toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 5,
                                }
                              )}
                              {"%"}
                            </>
                          )}
                        </td>
                        <td className="p-2">
                          <p>
                            {!aprValue ? (
                              <Skeleton className="w-full" />
                            ) : (
                              <>
                                {(
                                  (aprValue * initialAmount * 30) /
                                  36500
                                ).toLocaleString(undefined, {
                                  maximumFractionDigits: 5,
                                })}
                              </>
                            )}
                          </p>
                          <p className="text-slate-500">
                            {!aprValue ? (
                              <Skeleton className="w-full" />
                            ) : (
                              <>
                                {"$"}
                                {(
                                  (aprValue * initialAmount * tallyPrice * 30) /
                                  36500
                                ).toLocaleString(undefined, {
                                  maximumFractionDigits: 5,
                                })}
                              </>
                            )}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2">365 days</td>
                        <td className="p-2">
                          {!aprValue ? (
                            <Skeleton className="w-full" />
                          ) : (
                            <>
                              {(aprValue * 1).toLocaleString(undefined, {
                                maximumFractionDigits: 3,
                              })}
                              {"%"}
                            </>
                          )}
                        </td>
                        <td className="p-2">
                          <p>
                            {!aprValue ? (
                              <Skeleton className="w-full" />
                            ) : (
                              <>
                                {(
                                  (aprValue * initialAmount) /
                                  100
                                ).toLocaleString(undefined, {
                                  maximumFractionDigits: 5,
                                })}
                              </>
                            )}
                          </p>
                          <p className="text-slate-500">
                            {!aprValue ? (
                              <Skeleton className="w-full" />
                            ) : (
                              <>
                                {"$"}
                                {(
                                  (aprValue * initialAmount * tallyPrice) /
                                  100
                                ).toLocaleString(undefined, {
                                  maximumFractionDigits: 5,
                                })}
                              </>
                            )}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
