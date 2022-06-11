import { useEffect, useState } from "react";
import { shuffle } from "lodash";

// import tokensData from "../../assets/data/introTokens";
import { supportedTokens } from "../../assets/data/tokens";
import classNames from "classnames";
import { Transition } from "@headlessui/react";
import { useEthers } from "@usedapp/core";
import { utils } from "ethers";
import axios from "axios";
import { BINANCE_API_URL, PANCAKESWAP_API_URL } from "../../assets/data/urls";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const MovingIcons = () => {
  const { chainId } = useEthers();
  const tokensData = chainId ? supportedTokens[chainId].slice(1) : [];
  const [shuffledArr, setShuffledArr] = useState(
    shuffle(tokensData).slice(0, 5)
  );
  const [tokenPrice0, setTokenPrice0] = useState(undefined);
  const [tokenPrice1, setTokenPrice1] = useState(undefined);
  const [tokenPrice2, setTokenPrice2] = useState(undefined);
  const [tokenPrice3, setTokenPrice3] = useState(undefined);
  const [tokenPrice4, setTokenPrice4] = useState(undefined);
  const [tokenChange0, setTokenChange0] = useState(undefined);
  const [tokenChange1, setTokenChange1] = useState(undefined);
  const [tokenChange2, setTokenChange2] = useState(undefined);
  const [tokenChange3, setTokenChange3] = useState(undefined);
  const [tokenChange4, setTokenChange4] = useState(undefined);
  const [isShuffled, setIsShuffled] = useState(true);

  // get token prices from pancakeswap
  useEffect(() => {
    for (let i = 0; i < shuffledArr.length; i++) {
      switch (i) {
        case 0:
          setTokenPrice0(undefined);
          break;
        case 1:
          setTokenPrice1(undefined);
          break;
        case 2:
          setTokenPrice2(undefined);
          break;
        case 3:
          setTokenPrice3(undefined);
          break;
        case 4:
          setTokenPrice4(undefined);
          break;
        default:
          break;
      }
      shuffledArr[i] &&
        utils.isAddress(shuffledArr[i].address) &&
        axios(PANCAKESWAP_API_URL + shuffledArr[i].address).then((resp) => {
          if (resp && resp.data && resp.data.data) {
            switch (i) {
              case 0:
                resp.status === 200
                  ? setTokenPrice0(parseFloat(resp.data.data.price))
                  : setTokenPrice0(undefined);
                break;
              case 1:
                resp.status === 200
                  ? setTokenPrice1(parseFloat(resp.data.data.price))
                  : setTokenPrice1(undefined);
                break;
              case 2:
                resp.status === 200
                  ? setTokenPrice2(parseFloat(resp.data.data.price))
                  : setTokenPrice2(undefined);
                break;
              case 3:
                resp.status === 200
                  ? setTokenPrice3(parseFloat(resp.data.data.price))
                  : setTokenPrice3(undefined);
                break;
              case 4:
                resp.status === 200
                  ? setTokenPrice4(parseFloat(resp.data.data.price))
                  : setTokenPrice4(undefined);
                break;
              default:
                break;
            }
          }
        });
    }
  }, [shuffledArr]);

  // get token changes from binance
  useEffect(() => {
    for (let i = 0; i < shuffledArr.length; i++) {
      switch (i) {
        case 0:
          setTokenChange0(undefined);
          break;
        case 1:
          setTokenChange1(undefined);
          break;
        case 2:
          setTokenChange2(undefined);
          break;
        case 3:
          setTokenChange3(undefined);
          break;
        case 4:
          setTokenChange4(undefined);
          break;
        default:
          break;
      }
      shuffledArr[i] &&
        shuffledArr[i].symbol &&
        axios(
          BINANCE_API_URL +
            (shuffledArr[i].nick
              ? shuffledArr[i].nick
              : shuffledArr[i].symbol) +
            "USDT"
        ).then((resp) => {
          if (resp && resp.status && resp.data) {
            switch (i) {
              case 0:
                resp.status === 200
                  ? setTokenChange0(parseFloat(resp.data.priceChangePercent))
                  : setTokenChange0(undefined);
                break;
              case 1:
                resp.status === 200
                  ? setTokenChange1(parseFloat(resp.data.priceChangePercent))
                  : setTokenChange1(undefined);
                break;
              case 2:
                resp.status === 200
                  ? setTokenChange2(parseFloat(resp.data.priceChangePercent))
                  : setTokenChange2(undefined);
                break;
              case 3:
                resp.status === 200
                  ? setTokenChange3(parseFloat(resp.data.priceChangePercent))
                  : setTokenChange3(undefined);
                break;
              case 4:
                resp.status === 200
                  ? setTokenChange4(parseFloat(resp.data.priceChangePercent))
                  : setTokenChange4(undefined);
                break;
              default:
                break;
            }
          }
        });
    }
  }, [shuffledArr]);

  return (
    <Transition
      show={isShuffled}
      appear={true}
      beforeEnter={() => {
        setShuffledArr(shuffle(tokensData).slice(0, 5));
      }}
      afterEnter={() => {
        setTimeout(() => {
          setIsShuffled(false);
        }, 8000);
      }}
      afterLeave={() => {
        setIsShuffled(true);
        clearTimeout();
      }}
      className="mb-4 grid grid-cols-2 items-center gap-4 md:grid-cols-3 xl:grid-cols-5"
      unmount={true}
    >
      {shuffledArr.map((item, index) => {
        return (
          <Transition.Child
            key={index}
            enter="transition ease duration-500"
            enterFrom="-translate-y-full scale-95 opacity-0"
            enterTo="translate-y-0 scale-100 opacity-100"
            leave="transition ease duration-500"
            leaveFrom="translate-y-0 scale-100 opacity-100"
            leaveTo="translate-y-full scale-95 opacity-0"
          >
            <div
              key={`${item.symbol} ${index}`}
              className="flex w-36  items-center rounded-md  border-2 border-[#e2c574] bg-[#262626] py-3 px-2 text-white transition-all duration-200 hover:bg-[#e2c574]"
            >
              <a
                href={`https://exchange.tally.org/#/swap?outputCurrency=${item.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center"
              >
                <img src={item.logo} alt="" className="h-7 w-7" />
                <div className="ml-2 flex flex-col">
                  <span className="flex items-center justify-between text-xs uppercase text-blue-400">
                    <span>{item.symbol}</span>
                    <span
                      className={classNames("ml-2 font-semibold", {
                        "text-red-500":
                          (index === 0
                            ? tokenChange0
                            : index === 1
                            ? tokenChange1
                            : index === 2
                            ? tokenChange2
                            : index === 3
                            ? tokenChange3
                            : index === 4
                            ? tokenChange4
                            : 1) < 0,
                        "text-green-500":
                          (index === 0
                            ? tokenChange0
                            : index === 1
                            ? tokenChange1
                            : index === 2
                            ? tokenChange2
                            : index === 3
                            ? tokenChange3
                            : index === 4
                            ? tokenChange4
                            : 1) > 0,
                      })}
                    >
                      {index === 0 ? (
                        <>
                          {tokenChange0 ? (
                            tokenChange0.toLocaleString(undefined, {
                              maximumFractionDigits: 3,
                            }) + "%"
                          ) : (
                            <SkeletonTheme
                              baseColor="#606060"
                              highlightColor="#808080"
                            >
                              <Skeleton />
                            </SkeletonTheme>
                          )}
                        </>
                      ) : index === 1 ? (
                        <>
                          {tokenChange1 ? (
                            tokenChange1.toLocaleString(undefined, {
                              maximumFractionDigits: 3,
                            }) + "%"
                          ) : (
                            <SkeletonTheme
                              baseColor="#606060"
                              highlightColor="#808080"
                            >
                              <Skeleton />
                            </SkeletonTheme>
                          )}
                        </>
                      ) : index === 2 ? (
                        <>
                          {tokenChange2 ? (
                            tokenChange2.toLocaleString(undefined, {
                              maximumFractionDigits: 3,
                            }) + "%"
                          ) : (
                            <SkeletonTheme
                              baseColor="#606060"
                              highlightColor="#808080"
                            >
                              <Skeleton />
                            </SkeletonTheme>
                          )}
                        </>
                      ) : index === 3 ? (
                        <>
                          {tokenChange3 ? (
                            tokenChange3.toLocaleString(undefined, {
                              maximumFractionDigits: 3,
                            }) + "%"
                          ) : (
                            <SkeletonTheme
                              baseColor="#606060"
                              highlightColor="#808080"
                            >
                              <Skeleton />
                            </SkeletonTheme>
                          )}
                        </>
                      ) : index === 4 ? (
                        <>
                          {tokenChange4 ? (
                            tokenChange4.toLocaleString(undefined, {
                              maximumFractionDigits: 3,
                            }) + "%"
                          ) : (
                            <SkeletonTheme
                              baseColor="#606060"
                              highlightColor="#808080"
                            >
                              <Skeleton />
                            </SkeletonTheme>
                          )}
                        </>
                      ) : (
                        <SkeletonTheme
                          baseColor="#606060"
                          highlightColor="#808080"
                        >
                          <Skeleton />
                        </SkeletonTheme>
                      )}
                    </span>
                  </span>
                  <span className="mt-2 font-semibold">
                    {index === 0 ? (
                      <>
                        {tokenPrice0 ? (
                          "$" +
                          tokenPrice0.toLocaleString(undefined, {
                            maximumFractionDigits: 3,
                          })
                        ) : (
                          <SkeletonTheme
                            baseColor="#606060"
                            highlightColor="#808080"
                          >
                            <Skeleton />
                          </SkeletonTheme>
                        )}
                      </>
                    ) : index === 1 ? (
                      <>
                        {tokenPrice1 ? (
                          "$" +
                          tokenPrice1.toLocaleString(undefined, {
                            maximumFractionDigits: 3,
                          })
                        ) : (
                          <SkeletonTheme
                            baseColor="#606060"
                            highlightColor="#808080"
                          >
                            <Skeleton />
                          </SkeletonTheme>
                        )}
                      </>
                    ) : index === 2 ? (
                      <>
                        {tokenPrice2 ? (
                          "$" +
                          tokenPrice2.toLocaleString(undefined, {
                            maximumFractionDigits: 3,
                          })
                        ) : (
                          <SkeletonTheme
                            baseColor="#606060"
                            highlightColor="#808080"
                          >
                            <Skeleton />
                          </SkeletonTheme>
                        )}
                      </>
                    ) : index === 3 ? (
                      <>
                        {tokenPrice3 ? (
                          "$" +
                          tokenPrice3.toLocaleString(undefined, {
                            maximumFractionDigits: 3,
                          })
                        ) : (
                          <SkeletonTheme
                            baseColor="#606060"
                            highlightColor="#808080"
                          >
                            <Skeleton />
                          </SkeletonTheme>
                        )}
                      </>
                    ) : index === 4 ? (
                      <>
                        {tokenPrice4 ? (
                          "$" +
                          tokenPrice4.toLocaleString(undefined, {
                            maximumFractionDigits: 3,
                          })
                        ) : (
                          <SkeletonTheme
                            baseColor="#606060"
                            highlightColor="#808080"
                          >
                            <Skeleton />
                          </SkeletonTheme>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </span>
                </div>
              </a>
            </div>
          </Transition.Child>
        );
      })}
    </Transition>
  );
};

export default MovingIcons;
