import { Routes, Route } from 'react-router-dom';
import { Layout, LazyLoad } from './components';
import {
    HomePage,
    LiquidityPage,
    ExchangePage,
    PoolsPage,
    FarmsPage,
    NFTmarketPage,
    StakeLaunchPadPage,
    NFTearnPage,
    TallyCentralisedPage,
} from './pages';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route
                    index
                    element={
                        <LazyLoad loadingMessage='Loading Home...'>
                            <HomePage />
                        </LazyLoad>
                    }
                />

                <Route
                    path='liquidity'
                    element={
                        <LazyLoad loadingMessage='Loading Liquidity...'>
                            {/* <LiquidityPage /> */}
                            <ExchangePage />
                        </LazyLoad>
                    }
                />

                <Route
                    path='swap'
                    element={
                        <LazyLoad loadingMessage='Loading Exchange...'>
                            <ExchangePage />
                        </LazyLoad>
                    }
                />

                <Route
                    path='pools'
                    element={
                        <LazyLoad loadingMessage='Loading pools...'>
                            <PoolsPage />
                        </LazyLoad>
                    }
                >
                    <Route
                        path=':stakeType'
                        element={
                            <LazyLoad loadingMessage='Loading pools...'>
                                <StakeLaunchPadPage />
                            </LazyLoad>
                        }
                    />
                </Route>

                <Route
                    path='farms'
                    element={
                        <LazyLoad loadingMessage='Loading farms...'>
                            <FarmsPage />
                        </LazyLoad>
                    }
                />

                <Route
                    path='nftmarket'
                    element={
                        <LazyLoad loadingMessage='Loading NFT Market...'>
                            <NFTmarketPage />
                        </LazyLoad>
                    }
                />

                <Route
                    path='stakelaunchpad'
                    element={
                        <LazyLoad loadingMessage='Loading Stake Launchpad...'>
                            <StakeLaunchPadPage />
                        </LazyLoad>
                    }
                />

                <Route
                    path='nftearn'
                    element={
                        <LazyLoad loadingMessage='Loading NFT earn...'>
                            <NFTearnPage />
                        </LazyLoad>
                    }
                />

                <Route
                    path='tallycentralised'
                    element={
                        <LazyLoad loadingMessage='Loading Tally Centralised...'>
                            <TallyCentralisedPage />
                        </LazyLoad>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
