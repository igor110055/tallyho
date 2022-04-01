import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout, LazyLoad, NotFoundRoute } from './components';
import { CoinsTable, SwapSection } from './containers';
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
} from './pages';

function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route
                    index
                    element={
                        <LazyLoad>
                            <HomePage />
                        </LazyLoad>
                    }
                />

                <Route
                    path='liquidity'
                    element={
                        <LazyLoad>
                            <LiquidityPage />
                            {/* <ExchangePage /> */}
                        </LazyLoad>
                    }
                />

                <Route
                    path='swap'
                    element={
                        <LazyLoad>
                            <ExchangePage />
                        </LazyLoad>
                    }
                >
                    <Route path='add/:coin' element={<SwapSection />} />
                </Route>

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

                <Route
                    path='farms'
                    element={
                        <LazyLoad>
                            <FarmsPage />
                        </LazyLoad>
                    }
                />

                <Route
                    path='nftmarket'
                    element={
                        <LazyLoad>
                            <NFTmarketPage />
                        </LazyLoad>
                        // <NotFoundRoute />
                    }
                />

                <Route
                    path='stakelaunchpad'
                    element={
                        // <LazyLoad>
                        //     <StakeLaunchPadPage />
                        // </LazyLoad>
                        <NotFoundRoute />
                    }
                />

                <Route
                    path='nftearn'
                    element={
                        // <LazyLoad>
                        //     <NFTearnPage />
                        // </LazyLoad>
                        <NotFoundRoute />
                    }
                />

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

                <Route
                    path='tallycentralised'
                    element={
                        <LazyLoad>
                            <TallyCentralisedPage />
                        </LazyLoad>
                    }
                />

                <Route path='*' element={<NotFoundRoute />} />
            </Route>
        </Routes>
    );
}

export default App;
