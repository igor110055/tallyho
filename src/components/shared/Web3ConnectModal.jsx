import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import metamaskIcon from "../../assets/images/metamask.svg";
import walletconnectIcon from "../../assets/images/walletconnect.svg";
import { useEthers } from "@usedapp/core";
import { useSelector } from "react-redux";

export default function Web3ConnectModal({ open, setOpen }) {
  const { activateBrowserWallet, chainId, switchNetwork } = useEthers();
  const supportedChainIds = useSelector((state) => state.chain.supportedIds);

  const connectMetamask = () => {
    if (!supportedChainIds.includes(chainId))
      switchNetwork(supportedChainIds?.[0]);
    activateBrowserWallet();
  };

  const connectWalletConnect = () => {};

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
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
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="rounded-xl bg-white p-2">
                <button
                  className="flex w-full flex-col items-center rounded-xl border border-white bg-white py-6 px-4 transition-colors duration-200 hover:bg-[#c3c3c3]/20"
                  onClick={connectMetamask}
                >
                  <img
                    src={metamaskIcon}
                    alt="metamask icon"
                    className="mb-2 h-11 w-11"
                  />
                  <h1 className="text-2xl font-semibold text-primary-darkText">
                    MetaMask
                  </h1>
                  <p className="text-lg text-[#a9a9bc]">
                    Connect to your MetaMask wallet
                  </p>
                </button>
                <hr className="my-2" />
                <button
                  className="flex w-full flex-col items-center rounded-xl border border-white bg-white py-6 px-4 transition-colors duration-200 hover:bg-[#c3c3c3]/20"
                  onClick={connectWalletConnect}
                >
                  <img
                    src={walletconnectIcon}
                    alt="metamask icon"
                    className="mb-2 h-11 w-11"
                  />
                  <h1 className="text-2xl font-semibold text-primary-darkText">
                    WalletConnect
                  </h1>
                  <p className="text-lg text-[#a9a9bc]">
                    Scan with WalletConnect to connect
                  </p>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
