import { useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout, LazyLoad, NotFoundRoute } from './components';
import { CoinsTable, LiquiditySwap, SwapSection, LiquidityAddSection } from './containers';
import Web3 from 'web3';
import {
    HomePage,
    LiquidityPage,
    ExchangePage,
    PoolsPage,
    FarmsPage,
    NFTmarketPage,
    // StakeLaunchPadPage,
    // NFTearnPage,
    TallyCentralisedPage,
    PoolsStakeType,
    TokenCheckerPage,
    AnalyticsPageLayout,
    AnalyticsOverviewPage,
    AnalyticsFilterPage,
    TallyPay,
    TallyPayIndex,
    TallyWills,
    LivingTrust,
    TempLock,
    MyDefiAccount,
} from './pages';
import { PANCAKESWAP_API_URL } from "./assets/data/urls";
import { TALLY } from "./assets/data/addresses";
import axios from "axios";
import { TALLY_PRICE_GET } from "./Store/Actions/actionTypes";

function App() {
    const { pathname } = useLocation();
    const { account, chainId, switchNetwork } = useEthers();
    const supportedChainIds = useSelector(state => state.chain.supportedIds);
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        if (account && !supportedChainIds.includes(chainId))
          switchNetwork(supportedChainIds?.[0]);
      }, [account, chainId, supportedChainIds, switchNetwork]);

    useEffect(() => {
        axios(
          PANCAKESWAP_API_URL + "0xab15b3eec70514308b0ad65e8b760398c5839947"
        ).then((resp) => {
          if (resp && resp.data && resp.data.data)
            dispatch({
              type: TALLY_PRICE_GET,
              payload: parseFloat(resp.data.data.price),
            });
        });
      }, [dispatch]);

    let web3 = new Web3('ws://localhost:8546');
    console.log(web3);

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* Home Page Route */}
                <Route
                    index
                    element={
                        <LazyLoad>
                            <HomePage />
                        </LazyLoad>
                    }
                />

                {/* Liquidity Page Route */}
                <Route
                    path='liquidity'
                    element={
                        <LazyLoad>
                            <LiquidityPage />
                        </LazyLoad>
                    }
                >
                    <Route path="add" element={<LiquidityAddSection />} />
                </Route>

                {/* Exchange Page Route */}
                <Route
                    path='swap'
                    element={
                        <LazyLoad>
                            <ExchangePage />
                        </LazyLoad>
                    }
                >
                    <Route path="add" element={<SwapSection />} />
                </Route>

                {/* Pools Page Route */}
                <Route
                    path='pools'
                    element={
                        <LazyLoad>
                            <PoolsPage />
                        </LazyLoad>
                    }
                >
                    <Route
                        path=':stakeType'
                        element={
                            <LazyLoad>
                                <PoolsStakeType />
                            </LazyLoad>
                        }
                    />
                </Route>

                {/* Farms Page Route */}
                <Route
                    path='farms'
                    element={
                        <LazyLoad>
                            <FarmsPage />
                        </LazyLoad>
                    }
                />

                {/* Tally Pay Route */}
                <Route
                    path='tally-pay'
                    element={
                        <LazyLoad>
                            <TallyPay />
                        </LazyLoad>
                    }
                >
                    <Route
                        index
                        element={
                            <LazyLoad>
                                <TallyPayIndex />
                            </LazyLoad>
                        }
                    />

                    <Route
                        path='tally-wills'
                        element={
                            <LazyLoad>
                                <TallyWills />
                            </LazyLoad>
                        }
                    />
                    <Route
                        path='living-trust'
                        element={
                            <LazyLoad>
                                <LivingTrust />
                            </LazyLoad>
                        }
                    />
                    <Route
                        path='temp-lock'
                        element={
                            <LazyLoad>
                                <TempLock />
                            </LazyLoad>
                        }
                    />
                    <Route
                        path='my-defi'
                        element={
                            <LazyLoad>
                                <MyDefiAccount />
                            </LazyLoad>
                        }
                    />
                </Route>

                {/* NFTmarket Page Route */}
                <Route
                    path='nftmarket'
                    element={
                        <LazyLoad>
                            <NFTmarketPage />
                        </LazyLoad>
                    }
                />

                {/* Tally Launchpad Page Route */}
                <Route
                    path='stakelaunchpad'
                    element={
                        // <LazyLoad>
                        //     <StakeLaunchPadPage />
                        // </LazyLoad>
                        <NotFoundRoute />
                    }
                />

                {/* NFTearn Page Route */}
                <Route
                    path='nftearn'
                    element={
                        // <LazyLoad>
                        //     <NFTearnPage />
                        // </LazyLoad>
                        <NotFoundRoute />
                    }
                />

                {/* Token Checker Page Route */}
                <Route
                    path='tokenchecker'
                    element={
                        <LazyLoad>
                            <TokenCheckerPage />
                        </LazyLoad>
                    }
                >
                    <Route index path=':filter' element={<CoinsTable />} />
                </Route>

                {/* Tally Centralised Page Route */}
                <Route
                    path='tallycentralised'
                    element={
                        <LazyLoad>
                            <TallyCentralisedPage />
                        </LazyLoad>
                    }
                />

                {/* Analytics Routes */}
                <Route
                    path='analytics'
                    element={
                        <LazyLoad>
                            <AnalyticsPageLayout />
                        </LazyLoad>
                    }
                >
                    <Route
                        index
                        element={
                            <LazyLoad>
                                <AnalyticsOverviewPage />
                            </LazyLoad>
                        }
                    />

                    <Route
                        path=':filter'
                        element={
                            <LazyLoad>
                                <AnalyticsFilterPage />
                            </LazyLoad>
                        }
                    />
                </Route>

                <Route path='*' element={<NotFoundRoute />} />
            </Route>
        </Routes>
    );
}

export default App;
