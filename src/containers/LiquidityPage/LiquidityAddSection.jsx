import { useEffect, useState } from "react";
import { FaCaretLeft } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";
import { useEthers, useCall, useTokenBalance } from "@usedapp/core";

import factoryAbi from "../../assets/abi/TallyswapFactory.json";
import pairAbi from "../../assets/abi/TallyswapPair.json";
import ierc20Abi from "../../assets/abi/IERC20.json";

import exchangeImg from "../../assets/images/exchange.png";
import { SelectTokenModal } from "../../components";
import Web3ConnectModal from "../../components/shared/Web3ConnectModal";
import { PoolInfo } from "../../components/shared/PoolInfo";
import {
  TALLYSWAP_FACTORY_ADDRESS,
  ZERO_ADDRESS,
} from "../../consts/addresses.js";

const LiquidityAddSection = ({ openSettingsModal }) => {
  const [isOnFirstToken, setIsOnFirstToken] = useState(true);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [firstToken, setFirstToken] = useState(undefined);
  const [secToken, setSecToken] = useState(undefined);
  const [firstTokenVal, setFirstTokenVal] = useState("");
  const [secTokenVal, setSecTokenVal] = useState("");
  const [firstTokenTime, setFirstTokenTime] = useState(undefined);
  const [secTokenTime, setSecTokenTime] = useState(undefined);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [firstMax, setFirstMax] = useState(false);
  const [secMax, setSecMax] = useState(false);

  const { account, chainId } = useEthers();

  // balance
  const firstBalance = useTokenBalance(
    firstToken && firstToken.address,
    account && account
  );
  const secBalance = useTokenBalance(
    secToken && secToken.address,
    account && account
  );

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

  // get token pair
  const getPairResult =
    useCall(
      firstToken &&
        firstToken.address &&
        secToken &&
        secToken.address && {
          contract: new Contract(
            TALLYSWAP_FACTORY_ADDRESS[chainId],
            new utils.Interface(factoryAbi)
          ),
          method: "getPair",
          args: [firstToken.address, secToken.address],
        }
    ) ?? {};

  getPairResult &&
    getPairResult.error &&
    console.log(getPairResult.error.message);

  const pairAddress = getPairResult.value?.[0];

  // get pair price
  const price0Result =
    useCall(
      firstToken &&
        firstToken.address &&
        secToken &&
        secToken.address &&
        pairAddress &&
        pairAddress !== ZERO_ADDRESS && {
          contract: new Contract(pairAddress, new utils.Interface(pairAbi)),
          method: "price0CumulativeLast",
          args: [],
        }
    ) ?? {};

  // get pair price
  const price1Result =
    useCall(
      firstToken &&
        firstToken.address &&
        secToken &&
        secToken.address &&
        pairAddress &&
        pairAddress !== ZERO_ADDRESS && {
          contract: new Contract(pairAddress, new utils.Interface(pairAbi)),
          method: "price1CumulativeLast",
          args: [],
        }
    ) ?? {};

  price0Result && price0Result.error && console.log(price0Result.error.message);
  price1Result && price1Result.error && console.log(price1Result.error.message);

  const price0 = price0Result ? price0Result.value?.[0]?.toNumber() : undefined;
  const price1 = price1Result ? price1Result.value?.[0]?.toNumber() : undefined;

  // side effect for account change
  useEffect(() => {
    if (account) setConnectModalOpen(false);
  }, [account]);

  // side effect for token selection
  useEffect(() => {
    if (firstToken && secToken && firstToken.address === secToken.address) {
      if (firstTokenTime && secTokenTime) {
        if (firstTokenTime < secTokenTime) {
          setFirstToken(undefined);
          setFirstTokenTime(new Date());
        } else {
          setSecToken(undefined);
          setSecTokenTime(new Date());
        }
      }
    }
  }, [firstToken, secToken, firstTokenTime, secTokenTime]);

  return (
    <div className="relative z-10 w-full max-w-lg py-4 pb-8 mt-5 text-white rounded-2xl bg-card_gradient">
      <div className="flex items-center justify-center p-6">
        <h2 className="flex justify-between w-full text-sm font-semibold">
          <Link to="/liquidity">
            <FaCaretLeft className="w-5 h-5 cursor-pointer" />
          </Link>
          <span>Add Liquidity</span>
          <QuestionMarkCircleIcon className="w-5 h-5" />
        </h2>
      </div>
      {account && pairAddress === ZERO_ADDRESS && (
        <div className="flex-row px-4 py-2 mx-5 text-yellow-300 rounded-xl">
          You are the first liquidity provider. The ratio of tokens you add will
          set the price of this pool. Once you are happy with the rate click
          Supply to review.
        </div>
      )}
      <div className="grid px-6 py-3 auto-rows-auto gap-y-3">
        {/* From */}
        <div className="flex justify-between px-3">
          <div className="text-md">
            {firstToken && (
              <>
                <span className="text-gray-400">Balance</span>
                <span className="mx-3 text-gray-200">
                  {firstBalance &&
                    utils.formatUnits(firstBalance, firstDecimal)}
                </span>
              </>
            )}
          </div>
          <div className="flex">
            {!firstMax && (
              <button
                className="px-1 mx-2 text-sm border rounded-xl border-primary-brand_light text-primary-brand_light hover:border-blue-400 hover:text-blue-400"
                onClick={() => {
                  setFirstTokenVal(
                    utils.formatUnits(firstBalance, firstDecimal)
                  );
                  setFirstMax(true);
                }}
              >
                max
              </button>
            )}
            <button
              className="flex items-center space-x-2"
              onClick={() => {
                setIsOnFirstToken(true);
                setTokenModalOpen(true);
              }}
            >
              {firstToken && (
                <>
                  <img
                    src={firstToken.logo}
                    alt={`${firstToken.symbol} logo`}
                    className="object-cover w-6 h-6 rounded-full"
                  />
                  <span className="text-sm font-semibold">
                    {firstToken.symbol}
                  </span>
                  <ChevronDownIcon className="w-5 h-5 text-primary-brand_light" />
                </>
              )}
              {!firstToken && (
                <>
                  <span className="text-sm font-semibold">Select Token</span>
                  <ChevronDownIcon className="w-5 h-5 text-primary-brand_light" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-row w-full px-3 py-2 bg-transparent border border-gray-300 rounded-2xl">
          <input
            value={firstTokenVal}
            onChange={(event) => {
              setFirstTokenVal(event.target.value);
              setFirstMax(false);
            }}
            min={0}
            type="number"
            inputMode="decimal"
            title="Token Amount"
            autoComplete="off"
            autoCorrect="off"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder="0.0"
            maxLength={79}
            spellCheck="false"
            className="relative w-full text-ellipsis border-none bg-transparent font-semibold text-[#708db7] outline-none focus:border-none focus:bg-transparent focus:text-[#708db7] focus:outline-none"
          />
        </div>

        {/* Exchange Icon */}
        <div className="pt-4 pb-0">
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                const tempToken = secToken;
                const tempVal = secTokenVal;
                const tempTime = secTokenTime;
                setSecToken(firstToken);
                setFirstToken(tempToken);
                setSecTokenVal(firstTokenVal);
                setFirstTokenVal(tempVal);
                setSecTokenTime(firstTokenTime);
                setFirstTokenTime(tempTime);
              }}
            >
              <img src={exchangeImg} alt="exchange icon" className="w-12" />
            </button>
          </div>
        </div>

        {/* To */}
        <div className="flex justify-between px-3">
          <span className="text-md">
            {secToken && (
              <>
                <span className="text-gray-400">Balance</span>
                <span className="mx-3 text-gray-200">
                  {secBalance && utils.formatUnits(secBalance, secDecimal)}
                </span>
              </>
            )}
          </span>
          <div className="flex">
            {!secMax && (
              <button
                className="px-1 mx-2 text-sm border rounded-xl border-primary-brand_light text-primary-brand_light hover:border-blue-400 hover:text-blue-400"
                onClick={() => {
                  setSecTokenVal(utils.formatUnits(secBalance, secDecimal));
                  setSecMax(true);
                }}
              >
                max
              </button>
            )}
            <button
              className="flex items-center space-x-2"
              onClick={() => {
                setIsOnFirstToken(false);
                setTokenModalOpen(true);
              }}
            >
              {secToken && (
                <>
                  <img
                    src={secToken.logo}
                    alt={`${secToken.symbol} logo`}
                    className="object-cover w-6 h-6 rounded-full"
                  />
                  <span className="text-sm font-semibold">
                    {secToken.symbol}
                  </span>
                  <ChevronDownIcon className="w-5 h-5 text-primary-brand_light" />
                </>
              )}
              {!secToken && (
                <>
                  <span className="text-sm font-semibold">Select Token</span>
                  <ChevronDownIcon className="w-5 h-5 text-primary-brand_light" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-row w-full px-3 py-2 bg-transparent border border-gray-300 rounded-2xl">
          <input
            value={secTokenVal}
            onChange={(event) => {
              setSecTokenVal(event.target.value);
              setSecMax(false);
            }}
            type="number"
            min={0}
            inputMode="decimal"
            title="Token Amount"
            autoComplete="off"
            autoCorrect="off"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder="0.0"
            maxLength={79}
            spellCheck="false"
            className="relative w-full text-ellipsis border-none bg-transparent font-semibold text-[#708db7] outline-none focus:border-none focus:bg-transparent focus:text-[#708db7] focus:outline-none"
          />
        </div>
      </div>
      {account && firstToken && secToken && (
        <PoolInfo
          firstToken={firstToken}
          secToken={secToken}
          price={[price0, price1]}
          amount={[firstTokenVal, secTokenVal]}
          pair={pairAddress}
        />
      )}
      {/* Connect Button */}
      {!account && (
        <div className="flex items-center justify-center mx-6">
          <button
            className="flex items-center justify-center w-full h-12 px-6 text-xl font-black text-black transition-opacity duration-200 rounded-md cursor-pointer bg-primary-brand_light hover:opacity-80"
            onClick={() => setConnectModalOpen(true)}
          >
            Connect Wallet
          </button>
        </div>
      )}
      {account && (!firstToken || !secToken) && (
        <div className="flex items-center justify-center mx-6">
          <button className="flex items-center justify-center w-full h-12 px-6 text-xl font-black text-gray-300 transition-opacity duration-200 bg-gray-500 rounded-md cursor-pointer diabled hover:opacity-80">
            Select tokens
          </button>
        </div>
      )}
      {account &&
        firstToken &&
        secToken &&
        (isNaN(parseFloat(firstTokenVal)) ||
          parseFloat(firstTokenVal) === 0 ||
          isNaN(parseFloat(secTokenVal)) ||
          parseFloat(secTokenVal) === 0) && (
          <div className="flex items-center justify-center mx-6">
            <button className="flex items-center justify-center w-full h-12 px-6 text-xl font-black text-gray-300 transition-opacity duration-200 bg-gray-500 rounded-md cursor-pointer disabled hover:opacity-80">
              Enter amount
            </button>
          </div>
        )}
      {account &&
        firstToken &&
        secToken &&
        !isNaN(parseFloat(firstTokenVal)) &&
        parseFloat(firstTokenVal) !== 0 &&
        !isNaN(parseFloat(secTokenVal)) &&
        parseFloat(secTokenVal) !== 0 && (
          <>
            <div className="grid grid-cols-2 gap-3 mx-6 mb-3">
              <button className="flex items-center justify-center w-full h-12 px-6 text-xl font-black text-black transition-opacity duration-200 rounded-md cursor-pointer bg-primary-brand_light hover:opacity-80">
                Approve {firstToken.symbol}
              </button>
              <button className="flex items-center justify-center w-full h-12 px-6 text-xl font-black text-black transition-opacity duration-200 rounded-md cursor-pointer bg-primary-brand_light hover:opacity-80">
                Approve {secToken.symbol}
              </button>
            </div>
            <div className="flex items-center justify-center mx-6">
              <button className="flex items-center justify-center w-full h-12 px-6 text-xl font-black text-black transition-opacity duration-200 rounded-md cursor-pointer bg-primary-brand_light hover:opacity-80">
                Supply
              </button>
            </div>
          </>
        )}
      {isOnFirstToken && (
        <SelectTokenModal
          open={tokenModalOpen}
          setOpen={setTokenModalOpen}
          setToken={setFirstToken}
          setTokenTime={setFirstTokenTime}
        />
      )}
      {!isOnFirstToken && (
        <SelectTokenModal
          open={tokenModalOpen}
          setOpen={setTokenModalOpen}
          setToken={setSecToken}
          setTokenTime={setSecTokenTime}
        />
      )}
      <Web3ConnectModal open={connectModalOpen} setOpen={setConnectModalOpen} />
    </div>
  );
};

export default LiquidityAddSection;
