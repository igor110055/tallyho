import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { ZERO_ADDRESS } from "../../consts/addresses.js";

export const PoolInfo = ({ firstToken, secToken, price, amount, pair }) => {
  return (
    <div className="grid px-6 pt-2 pb-6 auto-rows-auto gap-y-3">
      <div className="mt-2 w-full flex-row rounded-xl bg-[#ffffff11] p-0">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-transparent px-4 py-2 text-left text-gray-300 hover:bg-[#ffffff22] focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                {!open && (
                  <>
                    {pair === ZERO_ADDRESS && (
                      <span>
                        Welcome! You are the first liquidity provider.
                      </span>
                    )}
                    {pair !== ZERO_ADDRESS && (
                      <span>You have 10% share of this pool.</span>
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
                <Disclosure.Panel className="px-2 py-2 m-2 text-gray-400 border border-gray-500 rounded-lg">
                  <div className="grid grid-cols-3">
                    <div className="text-center">
                      <div className="overflow-hidden text-ellipsis">
                        {pair !== ZERO_ADDRESS &&
                          price[0] &&
                          price[0].toPrecision(5)}
                        {pair !== ZERO_ADDRESS && !price[0] && "---"}
                        {pair === ZERO_ADDRESS &&
                          (isNaN(Number.parseFloat(amount[0])) ||
                            isNaN(Number.parseFloat(amount[1])) ||
                            Number.parseFloat(amount[0]) === 0 ||
                            Number.parseFloat(amount[1]) === 0) &&
                          "---"}
                        {pair === ZERO_ADDRESS &&
                          !isNaN(Number.parseFloat(amount[0])) &&
                          !isNaN(Number.parseFloat(amount[1])) &&
                          Number.parseFloat(amount[0]) !== 0 &&
                          Number.parseFloat(amount[1]) !== 0 &&
                          (
                            Number.parseFloat(amount[0]) /
                            Number.parseFloat(amount[1])
                          ).toPrecision(5)}
                      </div>
                      <div className="overflow-hidden text-ellipsis">
                        {firstToken.symbol} per {secToken.symbol}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="overflow-hidden text-ellipsis">
                        {pair !== ZERO_ADDRESS &&
                          price[1] &&
                          price[1].toPrecision(5)}
                        {pair !== ZERO_ADDRESS && !price[1] && "---"}
                        {pair === ZERO_ADDRESS &&
                          (isNaN(Number.parseFloat(amount[0])) ||
                            isNaN(Number.parseFloat(amount[1])) ||
                            Number.parseFloat(amount[0]) === 0 ||
                            Number.parseFloat(amount[1]) === 0) &&
                          "---"}
                        {pair === ZERO_ADDRESS &&
                          !isNaN(Number.parseFloat(amount[0])) &&
                          !isNaN(Number.parseFloat(amount[1])) &&
                          Number.parseFloat(amount[0]) !== 0 &&
                          Number.parseFloat(amount[1]) !== 0 &&
                          (
                            Number.parseFloat(amount[1]) /
                            Number.parseFloat(amount[0])
                          ).toPrecision(5)}
                      </div>
                      <div className="overflow-hidden text-ellipsis">
                        {secToken.symbol} per {firstToken.symbol}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="overflow-hidden text-ellipsis">
                        {pair === ZERO_ADDRESS &&
                          (isNaN(Number.parseFloat(amount[0])) ||
                            isNaN(Number.parseFloat(amount[1])) ||
                            Number.parseFloat(amount[0]) === 0 ||
                            Number.parseFloat(amount[1]) === 0) &&
                          "---"}
                        {pair === ZERO_ADDRESS &&
                          !isNaN(Number.parseFloat(amount[0])) &&
                          !isNaN(Number.parseFloat(amount[1])) &&
                          Number.parseFloat(amount[0]) !== 0 &&
                          Number.parseFloat(amount[1]) !== 0 &&
                          "100 %"}
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
