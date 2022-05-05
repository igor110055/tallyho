import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Store/store";

import "@fontsource/comfortaa";
import "@fontsource/roboto";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";

import {
  DAppProvider,
  DEFAULT_SUPPORTED_CHAINS,
  BSC,
  BSCTestnet,
} from "@usedapp/core";

const config = {
  networks: DEFAULT_SUPPORTED_CHAINS,
  notifications: {
    expirationPeriod: 4000,
    checkInterval: 1000,
  },
  readOnlyChainId: BSC.chainId,
  readOnlyUrls: {
    [BSC.chainId]: "https://bsc-dataseed1.binance.org",
    [BSCTestnet.chainId]: "https://data-seed-prebsc-1-s1.binance.org:8545",
  },
};

ReactDOM.render(
  <BrowserRouter>
    <DAppProvider config={config}>
      <Provider store={store}>
        <App />
      </Provider>
    </DAppProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
