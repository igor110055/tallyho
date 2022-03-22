import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const LiquidityPage = lazy(() => import("./LiquidityPage"));
const ExchangePage = lazy(() => import("./ExchangePage"));
const PoolsPage = lazy(() => import("./PoolsPage"));
const FarmsPage = lazy(() => import("./FarmsPage"));
const NFTmarketPage = lazy(() => import("./NFTMarketPage"));
const StakeLaunchPadPage = lazy(() => import("./StakeLaunchpadPage"));
const NFTearnPage = lazy(() => import("./NFTearnPage"));
const TallyCentralisedPage = lazy(() => import("./TallyCetralisedPage"));

export {
    HomePage,
    LiquidityPage,
    ExchangePage,
    PoolsPage,
    FarmsPage,
    NFTmarketPage,
    StakeLaunchPadPage,
    NFTearnPage,
    TallyCentralisedPage,
};
