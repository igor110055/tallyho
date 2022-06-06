import { useEffect, useState } from "react";
import { FaCaretLeft } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { Contract } from "@ethersproject/contracts";
import { BigNumber, utils } from "ethers";
import {
  useEthers,
  useCall,
  useTokenBalance,
  useContractFunction,
} from "@usedapp/core";

import factoryAbi from "../../assets/abi/TallyswapFactory.json";
import routerAbi from "../../assets/abi/TallyswapRouter02.json";
import ierc20Abi from "../../assets/abi/IERC20.json";
import pairAbi from "../../assets/abi/TallyswapPair.json";

import exchangeImg from "../../assets/images/exchange.png";
import { SelectTokenModal } from "../../components";
import Web3ConnectModal from "../../components/shared/Web3ConnectModal";
import { PoolInfo } from "../../components/shared/PoolInfo";
import {
  TALLYSWAP_FACTORY_ADDRESS,
  ZERO_ADDRESS,
  TALLYSWAP_ROUTER_ADDRESS,
  RANDOM_ADDRESS,
} from "../../assets/data/addresses.js";
import { useSelector } from "react-redux";

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
  const [caretIn, setCaretIn] = useState(-1);

  const { account, chainId } = useEthers();

  const deadlineSetting = useSelector((state) => state.transSetting.deadline);
  const speedSetting = useSelector((state) => state.transSetting.transSpeed);
  const slippageSetting = useSelector(
    (state) => state.transSetting.slipTolerance
  );

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

  // approve functions
  const approveFirstFunc = useContractFunction(
    new Contract(
      firstToken && firstToken.address ? firstToken.address : RANDOM_ADDRESS,
      ierc20Abi
    ),
    "approve",
    {
      transactionName:
        "Approve " + (firstToken ? firstToken.symbol : "UNDEFINED"),
    }
  );
  const approveSecFunc = useContractFunction(
    new Contract(
      secToken && secToken.address ? secToken.address : RANDOM_ADDRESS,
      ierc20Abi
    ),
    "approve",
    {
      transactionName: "Approve " + (secToken ? secToken.symbol : "UNDEFINED"),
    }
  );

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

  const pairAddress = getPairResult.value?.[0];

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

  // addliquidity function
  const addLiquidityFunc = useContractFunction(
    new Contract(TALLYSWAP_ROUTER_ADDRESS[chainId], routerAbi),
    "addLiquidity",
    {
      transactionName: "Add liquidity",
    }
  );

  // function definitions
  const addLiquidityDef = () => {
    var slippedFirstVal =
      (parseFloat(firstTokenVal) * (100 - slippageSetting)) / 100;
    var slippedSecVal =
      (parseFloat(secTokenVal) * (100 - slippageSetting)) / 100;

    firstToken &&
      secToken &&
      addLiquidityFunc.send(
        firstToken.address,
        secToken.address,
        Math.ceil(parseFloat(firstTokenVal) * 10 ** firstDecimal),
        Math.ceil(parseFloat(secTokenVal) * 10 ** secDecimal),
        Math.floor(slippedFirstVal * 10 ** firstDecimal),
        Math.floor(slippedSecVal * 10 ** secDecimal),
        account,
        Math.ceil(new Date().getTime() / 1000) + deadlineSetting * 60
        // {
        //   gasLimit: 21000,
        //   gasPrice: speedSetting,
        // }
      );
  };

  // approve functions
  const approveFirst = () => {
    approveFirstFunc.send(
      TALLYSWAP_ROUTER_ADDRESS[chainId],
      Math.round(firstTokenVal * 10 ** firstDecimal)
    );
  };
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

  // auto calculation of a token amount based on the other token value and the relative prices
  useEffect(() => {
    if (
      reservesResult.value &&
      reservesResult.value[0] &&
      reservesResult.value[1] &&
      utils.formatUnits(
        firstToken.address === pairToken0
          ? reservesResult.value[0]
          : reservesResult.value[1],
        firstDecimal
      ) !== 0 &&
      utils.formatUnits(
        firstToken.address === pairToken0
          ? reservesResult.value[1]
          : reservesResult.value[0],
        secDecimal
      ) !== 0 &&
      caretIn === 0
    ) {
      setSecTokenVal(
        (firstTokenVal *
          utils.formatUnits(
            firstToken.address === pairToken0
              ? reservesResult.value[1]
              : reservesResult.value[0],
            secDecimal
          )) /
          utils.formatUnits(
            firstToken.address === pairToken0
              ? reservesResult.value[0]
              : reservesResult.value[1],
            firstDecimal
          )
      );
    }
  }, [
    firstTokenVal,
    reservesResult.value,
    caretIn,
    firstDecimal,
    secDecimal,
    pairToken0,
  ]);
  useEffect(() => {
    if (
      reservesResult.value &&
      reservesResult.value[0] &&
      reservesResult.value[1] &&
      utils.formatUnits(
        firstToken.address === pairToken0
          ? reservesResult.value[0]
          : reservesResult.value[1],
        firstDecimal
      ) !== 0 &&
      utils.formatUnits(
        firstToken.address === pairToken0
          ? reservesResult.value[1]
          : reservesResult.value[0],
        secDecimal
      ) !== 0 &&
      caretIn === 1
    ) {
      setFirstTokenVal(
        (secTokenVal *
          utils.formatUnits(
            firstToken.address === pairToken0
              ? reservesResult.value[0]
              : reservesResult.value[1],
            firstDecimal
          )) /
          utils.formatUnits(
            firstToken.address === pairToken0
              ? reservesResult.value[1]
              : reservesResult.value[0],
            secDecimal
          )
      );
    }
  }, [
    secTokenVal,
    reservesResult.value,
    caretIn,
    firstDecimal,
    secDecimal,
    pairToken0,
  ]);

  return (
    <div className="relative z-10 mt-5 w-full max-w-lg rounded-2xl bg-card_gradient py-4 pb-8 text-white">
      <div className="flex items-center justify-center p-6">
        <h2 className="flex w-full justify-between text-sm font-semibold">
          <Link to="/liquidity">
            <FaCaretLeft className="h-5 w-5 cursor-pointer" />
          </Link>
          <span>Add Liquidity</span>
          <QuestionMarkCircleIcon className="h-5 w-5" />
        </h2>
      </div>
      {account && pairAddress === ZERO_ADDRESS && (
        <div className="mx-5 flex-row rounded-xl px-4 py-2 text-yellow-300">
          You are the first liquidity provider. The ratio of tokens you add will
          set the price of this pool. Once you are happy with the rate click
          Supply to review.
        </div>
      )}
      <div className="grid auto-rows-auto gap-y-3 px-6 py-3">
        {/* From */}
        <div className="flex justify-between px-3">
          <div className="text-md">
            {firstToken && (
              <>
                <span className="text-gray-400">Balance</span>
                <span className="mx-3 text-gray-200">
                  {firstBalance &&
                    BigNumber.isBigNumber(firstBalance) &&
                    utils.formatUnits(firstBalance, firstDecimal)}
                </span>
              </>
            )}
          </div>
          <div className="flex">
            {firstToken && !firstMax && (
              <button
                className="mx-2 rounded-xl border border-primary-brand_light px-1 text-sm text-primary-brand_light hover:border-blue-400 hover:text-blue-400"
                onClick={() => {
                  firstBalance &&
                    BigNumber.isBigNumber(firstBalance) &&
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
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold">
                    {firstToken.symbol}
                  </span>
                  <ChevronDownIcon className="h-5 w-5 text-primary-brand_light" />
                </>
              )}
              {!firstToken && (
                <>
                  <span className="text-sm font-semibold">Select Token</span>
                  <ChevronDownIcon className="h-5 w-5 text-primary-brand_light" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex w-full flex-row rounded-2xl border border-gray-300 bg-transparent px-3 py-2">
          <input
            value={firstTokenVal}
            onChange={(event) => {
              setFirstTokenVal(event.target.value);
              setFirstMax(false);
              setCaretIn(0);
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
                  {secBalance &&
                    BigNumber.isBigNumber(secBalance) &&
                    utils.formatUnits(secBalance, secDecimal)}
                </span>
              </>
            )}
          </span>
          <div className="flex">
            {secToken && !secMax && (
              <button
                className="mx-2 rounded-xl border border-primary-brand_light px-1 text-sm text-primary-brand_light hover:border-blue-400 hover:text-blue-400"
                onClick={() => {
                  secBalance &&
                    BigNumber.isBigNumber(secBalance) &&
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
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold">
                    {secToken.symbol}
                  </span>
                  <ChevronDownIcon className="h-5 w-5 text-primary-brand_light" />
                </>
              )}
              {!secToken && (
                <>
                  <span className="text-sm font-semibold">Select Token</span>
                  <ChevronDownIcon className="h-5 w-5 text-primary-brand_light" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex w-full flex-row rounded-2xl border border-gray-300 bg-transparent px-3 py-2">
          <input
            value={secTokenVal}
            onChange={(event) => {
              setSecTokenVal(event.target.value);
              setSecMax(false);
              setCaretIn(1);
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
          amount={[firstTokenVal, secTokenVal]}
          pairAddress={pairAddress}
        />
      )}
      {/* Connect Button */}
      {!account && (
        <div className="mx-6 flex items-center justify-center">
          <button
            className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-primary-brand_light px-6 text-xl font-black text-black transition-opacity duration-200 hover:opacity-80"
            onClick={() => setConnectModalOpen(true)}
          >
            Connect Wallet
          </button>
        </div>
      )}
      {account && (!firstToken || !secToken) && (
        <div className="mx-6 flex items-center justify-center">
          <button className="diabled flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-gray-500 px-6 text-xl font-black text-gray-300 transition-opacity duration-200 hover:opacity-80">
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
          <div className="mx-6 flex items-center justify-center">
            <button className="disabled flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-gray-500 px-6 text-xl font-black text-gray-300 transition-opacity duration-200 hover:opacity-80">
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
            {parseFloat(firstTokenVal) <=
              parseFloat(
                firstBalance && BigNumber.isBigNumber(firstBalance)
                  ? utils.formatUnits(firstBalance, firstDecimal)
                  : "0"
              ) &&
              parseFloat(secTokenVal) <=
                parseFloat(
                  secBalance && BigNumber.isBigNumber(secBalance)
                    ? utils.formatUnits(secBalance, secDecimal)
                    : "0"
                ) && (
                <>
                  <div className="mx-6 mb-3 grid grid-cols-2 gap-3">
                    <button
                      className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-primary-brand_light px-6 text-xl font-black text-black transition-opacity duration-200 hover:opacity-80"
                      onClick={approveFirst}
                    >
                      Approve {firstToken.symbol}
                    </button>
                    <button
                      className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-primary-brand_light px-6 text-xl font-black text-black transition-opacity duration-200 hover:opacity-80"
                      onClick={() => {
                        approveSecFunc.send(
                          TALLYSWAP_ROUTER_ADDRESS[chainId],
                          Math.round(secTokenVal * 10 ** secDecimal)
                        );
                      }}
                    >
                      Approve {secToken.symbol}
                    </button>
                  </div>
                  <div className="mx-6 flex items-center justify-center">
                    <button
                      className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-primary-brand_light px-6 text-xl font-black text-black transition-opacity duration-200 hover:opacity-80"
                      onClick={addLiquidityDef}
                    >
                      Supply
                    </button>
                  </div>
                </>
              )}
            {(parseFloat(firstTokenVal) >
              parseFloat(utils.formatUnits(firstBalance, firstDecimal)) ||
              parseFloat(secTokenVal) >
                parseFloat(utils.formatUnits(secBalance, secDecimal))) && (
              <div className="mx-6 flex items-center justify-center">
                <button className="disabled flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-gray-500 px-6 text-xl font-black text-gray-300 transition-opacity duration-200 hover:opacity-80">
                  Insufficient amount
                </button>
              </div>
            )}
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
