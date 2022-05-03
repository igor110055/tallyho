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
  Rinkeby,
  DEFAULT_SUPPORTED_CHAINS,
  Mainnet,
} from "@usedapp/core";
import { getDefaultProvider } from "ethers";

const config = {
  networks: DEFAULT_SUPPORTED_CHAINS,
  notifications: {
    expirationPeriod: 4000,
    checkInterval: 1000,
  },
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider("mainnet"),
    [Rinkeby.chainId]: getDefaultProvider("rinkeby"),
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
