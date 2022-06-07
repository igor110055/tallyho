import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { useEthers, useCall } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";

import { ZERO_ADDRESS } from "../../assets/data/addresses.js";
import pairAbi from "../../assets/abi/TallyswapPair.json";
import ierc20Abi from "../../assets/abi/IERC20.json";

export const PoolInfo = ({ firstToken, secToken, amount, pairAddress }) => {
  const { account } = useEthers();

  // token decimals
  const firstDecimal =
    (
      useCall(
        firstToken &&
          firstToken.address && {
            contract: new Contract(firstToken.address, ierc20Abi),
            method: "decimals",
            args: [],
          }
      ) ?? {}
    ).value?.[0] ?? 18;

  const secDecimal =
    (
      useCall(
        secToken &&
          secToken.address && {
            contract: new Contract(secToken.address, ierc20Abi),
            method: "decimals",
            args: [],
          }
      ) ?? {}
    ).value?.[0] ?? 18;

  // total liquidity and account's liquidity
  const totalLiquidity =
    (
      useCall(
        pairAddress &&
          pairAddress !== ZERO_ADDRESS && {
            contract: new Contract(pairAddress, new utils.Interface(pairAbi)),
            method: "totalSupply",
            args: [],
          }
      ) ?? {}
    ).value?.[0] ?? 0;

  const accountLiquidity =
    (
      useCall(
        pairAddress &&
          pairAddress !== ZERO_ADDRESS && {
            contract: new Contract(pairAddress, new utils.Interface(pairAbi)),
            method: "balanceOf",
            args: [account],
          }
      ) ?? {}
    ).value?.[0] ?? 0;

  // get Reserves
  const reservesResult =
    useCall(
      firstToken &&
        firstToken.address &&
        secToken &&
        secToken.address &&
        pairAddress &&
        pairAddress !== ZERO_ADDRESS && {
          contract: new Contract(pairAddress, new utils.Interface(pairAbi)),
          method: "getReserves",
          args: [],
        }
    ) ?? {};

  // get pair tokens
  const pairToken0 =
    (
      useCall(
        firstToken &&
          firstToken.address &&
          secToken &&
          secToken.address &&
          pairAddress &&
          pairAddress !== ZERO_ADDRESS && {
            contract: new Contract(pairAddress, new utils.Interface(pairAbi)),
            method: "token0",
            args: [],
          }
      ) ?? {}
    ).value?.[0] ?? ZERO_ADDRESS;

  return (
    <div className="grid auto-rows-auto gap-y-3 px-6 pt-2 pb-6">
      <div className="mt-2 w-full flex-row rounded-xl bg-[#ffffff11] p-0">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-transparent px-4 py-2 text-left text-gray-300 hover:bg-[#ffffff22] focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                {!open && (
                  <>
                    {pairAddress === ZERO_ADDRESS && (
                      <span>
                        Welcome! You are the first liquidity provider.
                      </span>
                    )}
                    {pairAddress !== ZERO_ADDRESS && (
                      <>
                        {totalLiquidity === 0 ||
                        accountLiquidity === 0 ||
                        isNaN(utils.formatEther(totalLiquidity)) ||
                        utils.formatEther(totalLiquidity) === 0 ? (
                          <span>
                            This pool has not been provided any liquidity.
                          </span>
                        ) : (
                          <span>
                            You have{" "}
                            {Math.fround(
                              (utils.formatEther(accountLiquidity) /
                                utils.formatEther(totalLiquidity)) *
                                100
                            )}
                            % share of this pool.
                          </span>
                        )}
                      </>
                    )}
                    <ChevronUpIcon
                      className={`${
                        !open ? "rotate-180 transform" : ""
                      } text-white-500 h-5 w-5`}
                    />
                  </>
                )}
                {open && (
                  <>
                    <span>Prices and Your share</span>
                    <ChevronUpIcon
                      className={`${
                        !open ? "rotate-180 transform" : ""
                      } text-white-500 h-5 w-5`}
                    />
                  </>
                )}
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="m-2 rounded-lg border border-gray-500 px-2 py-2 text-gray-400">
                  <div className="grid grid-cols-3">
                    <div className="text-center">
                      <div className="overflow-hidden text-ellipsis">
                        {pairAddress !== ZERO_ADDRESS && (
                          <>
                            {!reservesResult.value && "---"}
                            {reservesResult.value && (
                              <>
                                {!reservesResult.value[0] ||
                                !reservesResult.value[1] ? (
                                  "---"
                                ) : (
                                  <>
                                    {utils.formatUnits(
                                      firstToken.address === pairToken0
                                        ? reservesResult.value[0]
                                        : reservesResult.value[1],
                                      firstDecimal
                                    ) === 0 ||
                                    utils.formatUnits(
                                      firstToken.address === pairToken0
                                        ? reservesResult.value[1]
                                        : reservesResult.value[0],
                                      secDecimal
                                    ) === 0
                                      ? "---"
                                      : (
                                          utils.formatUnits(
                                            firstToken.address === pairToken0
                                              ? reservesResult.value[0]
                                              : reservesResult.value[1],
                                            firstDecimal
                                          ) /
                                          utils.formatUnits(
                                            firstToken.address === pairToken0
                                              ? reservesResult.value[1]
                                              : reservesResult.value[0],
                                            secDecimal
                                          )
                                        ).toFIxed(5)}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                        {pairAddress === ZERO_ADDRESS &&
                          (isNaN(Number.parseFloat(amount[0])) ||
                            isNaN(Number.parseFloat(amount[1])) ||
                            Number.parseFloat(amount[0]) === 0 ||
                            Number.parseFloat(amount[1]) === 0) &&
                          "---"}
                        {pairAddress === ZERO_ADDRESS &&
                          !isNaN(Number.parseFloat(amount[0])) &&
                          !isNaN(Number.parseFloat(amount[1])) &&
                          Number.parseFloat(amount[0]) !== 0 &&
                          Number.parseFloat(amount[1]) !== 0 &&
                          (
                            Number.parseFloat(amount[0]) /
                            Number.parseFloat(amount[1])
                          ).toFIxed(5)}
                      </div>
                      <div className="overflow-hidden text-ellipsis">
                        {firstToken.symbol} per {secToken.symbol}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="overflow-hidden text-ellipsis">
                        {pairAddress !== ZERO_ADDRESS && (
                          <>
                            {!reservesResult.value && "---"}
                            {reservesResult.value && (
                              <>
                                {!reservesResult.value[1] ||
                                !reservesResult.value[0] ? (
                                  "---"
                                ) : (
                                  <>
                                    {utils.formatUnits(
                                      firstToken.address === pairToken0
                                        ? reservesResult.value[0]
                                        : reservesResult.value[1],
                                      firstDecimal
                                    ) === 0 ||
                                    utils.formatUnits(
                                      firstToken.address === pairToken0
                                        ? reservesResult.value[1]
                                        : reservesResult.value[0],
                                      secDecimal
                                    ) === 0
                                      ? "---"
                                      : (
                                          utils.formatUnits(
                                            firstToken.address === pairToken0
                                              ? reservesResult.value[1]
                                              : reservesResult.value[0],
                                            secDecimal
                                          ) /
                                          utils.formatUnits(
                                            firstToken.address === pairToken0
                                              ? reservesResult.value[0]
                                              : reservesResult.value[1],
                                            firstDecimal
                                          )
                                        ).toFIxed(5)}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                        {pairAddress === ZERO_ADDRESS &&
                          (isNaN(Number.parseFloat(amount[0])) ||
                            isNaN(Number.parseFloat(amount[1])) ||
                            Number.parseFloat(amount[0]) === 0 ||
                            Number.parseFloat(amount[1]) === 0) &&
                          "---"}
                        {pairAddress === ZERO_ADDRESS &&
                          !isNaN(Number.parseFloat(amount[0])) &&
                          !isNaN(Number.parseFloat(amount[1])) &&
                          Number.parseFloat(amount[0]) !== 0 &&
                          Number.parseFloat(amount[1]) !== 0 &&
                          (
                            Number.parseFloat(amount[1]) /
                            Number.parseFloat(amount[0])
                          ).toFIxed(5)}
                      </div>
                      <div className="overflow-hidden text-ellipsis">
                        {secToken.symbol} per {firstToken.symbol}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="overflow-hidden text-ellipsis">
                        {pairAddress === ZERO_ADDRESS &&
                          (isNaN(Number.parseFloat(amount[0])) ||
                            isNaN(Number.parseFloat(amount[1])) ||
                            Number.parseFloat(amount[0]) === 0 ||
                            Number.parseFloat(amount[1]) === 0) &&
                          "---"}
                        {pairAddress === ZERO_ADDRESS &&
                          !isNaN(Number.parseFloat(amount[0])) &&
                          !isNaN(Number.parseFloat(amount[1])) &&
                          Number.parseFloat(amount[0]) !== 0 &&
                          Number.parseFloat(amount[1]) !== 0 &&
                          "100 %"}
                        {pairAddress !== ZERO_ADDRESS && (
                          <>
                            {totalLiquidity === 0 ||
                            accountLiquidity === 0 ||
                            isNaN(utils.formatEther(totalLiquidity)) ||
                            utils.formatEther(totalLiquidity) === 0
                              ? "---"
                              : Math.fround(
                                  (utils.formatEther(accountLiquidity) /
                                    utils.formatEther(totalLiquidity)) *
                                    100
                                )}
                            {"%"}
                          </>
                        )}
                      </div>
                      <div className="overflow-hidden text-ellipsis">
                        Share of pool
                      </div>
                    </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};