import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { ArrowSmDownIcon, ArrowSmUpIcon, XIcon } from "@heroicons/react/solid";
import { CommonBaseToken, CurrencyItem } from "../../components";
import { useState } from "react";
import { supportedTokens } from "../../assets/data/tokens";
import { useEthers } from "@usedapp/core";

export default function SelectTokenModal({
  open,
  setOpen,
  setToken,
  setTokenTime,
}) {
  const [address, setAddress] = useState("");
  const [dirDown, setDirDown] = useState(true);
  const { chainId } = useEthers();

  const selectToken = (t) => {
    setToken && setToken(t);
    setOpen && setOpen(false);
    setTokenTime && setTokenTime(new Date());
  };

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
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:align-middle">
              <div className="grid auto-rows-auto gap-y-4 bg-white px-5 pt-5 pb-8">
                <div className="flex w-full items-center justify-between">
                  <h1 className="flex items-center space-x-3 text-lg font-medium text-primary-darkText">
                    Select a Token
                    <QuestionMarkCircleIcon className="ml-2 h-4 w-4" />
                  </h1>

                  <XIcon
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>

                <input
                  value={address}
                  type="text"
                  placeholder="Search name or Paste Address"
                  className="focus:border-1 w-full rounded-lg border border-primary-brand py-2 px-4 text-lg text-[#708db7] outline-none transition placeholder:font-medium focus:border-primary-darkText"
                  onChange={(event) => setAddress(event.target.value)}
                />

                <div className="flex flex-col rounded-lg border border-[#e4efff] p-2">
                  <h3 className="flex items-center text-sm text-[#777777]">
                    Common bases{" "}
                    <QuestionMarkCircleIcon className="ml-2 h-4 w-4" />
                  </h3>

                  <div className="grid grid-cols-3 gap-4 py-6 sm:grid-cols-4">
                    {supportedTokens[chainId]
                      .filter((t) => t.isBase === true)
                      .map((t, index) => (
                        <CommonBaseToken
                          icon={t.logo}
                          name={t.symbol}
                          key={index}
                          onClick={() => selectToken(t)}
                        />
                      ))}
                  </div>
                </div>

                <div className="my-1 flex flex-col">
                  <div className="my-4 flex justify-between">
                    <span className="text-sm font-semibold leading-6 text-primary-darkText">
                      Token Name
                    </span>

                    <button
                      className="rounded-lg bg-primary-brand p-2"
                      onClick={() => {
                        setDirDown(!dirDown);
                      }}
                    >
                      {dirDown && (
                        <ArrowSmDownIcon className="h-4 w-4 text-white" />
                      )}
                      {!dirDown && (
                        <ArrowSmUpIcon className="h-4 w-4 text-white" />
                      )}
                    </button>
                  </div>

                  <div className="h-20 w-full overflow-auto px-4 opacity-50">
                    {address === "" &&
                      dirDown &&
                      supportedTokens[chainId].map((t, index) => (
                        <CurrencyItem
                          icon={t.logo}
                          name={t.symbol}
                          key={index}
                          onClick={() => selectToken(t)}
                        />
                      ))}
                    {address === "" &&
                      !dirDown &&
                      supportedTokens[chainId]
                        .slice(0, supportedTokens[chainId].length)
                        .reverse()
                        .map((t, index) => (
                          <CurrencyItem
                            icon={t.logo}
                            name={t.symbol}
                            key={index}
                            onClick={() => selectToken(t)}
                          />
                        ))}
                    {address !== "" &&
                      dirDown &&
                      supportedTokens[chainId]
                        .filter(
                          (t) =>
                            t.address === parseInt(address, 16) ||
                            t.name.toLowerCase() === address.toLowerCase() ||
                            t.symbol.toLowerCase() === address.toLowerCase()
                        )
                        .map((t, index) => (
                          <CurrencyItem
                            icon={t.logo}
                            name={t.symbol}
                            key={index}
                            onClick={() => selectToken(t)}
                          />
                        ))}
                    {address !== "" &&
                      !dirDown &&
                      supportedTokens[chainId]
                        .filter(
                          (t) =>
                            t.address === parseInt(address, 16) ||
                            t.name.toLowerCase() === address.toLowerCase() ||
                            t.symbol.toLowerCase() === address.toLowerCase()
                        )
                        .reverse()
                        .map((t, index) => (
                          <CurrencyItem
                            icon={t.logo}
                            name={t.symbol}
                            key={index}
                            onClick={() => selectToken(t)}
                          />
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
