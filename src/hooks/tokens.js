import { useState, useEffect } from "react";
import axios from "axios";
import { utils } from "ethers";

import { BINANCE_API_URL, PANCAKESWAP_API_URL } from "../assets/data/urls";

export const useTokenPrice = (address) => {
  const [price, setPrice] = useState(undefined);

  useEffect(() => {
    const fetchFunc = () => {
      address &&
        utils.isAddress(address) &&
        axios(PANCAKESWAP_API_URL + address).then((resp) => {
          if (resp && resp.data && resp.data.data) {
            setPrice(parseFloat(resp.data.data.price));
          }
        });
    };
    const interval = setInterval(fetchFunc, 60 * 1000);
    fetchFunc();

    return () => clearInterval(interval);
  }, [address]);

  return price;
};

export const useTokenPriceFromBinance = (symbol) => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    symbol &&
      axios(BINANCE_API_URL + symbol + "USDT").then((resp) => {
        if (resp) {
          setData(parseFloat(resp));
        }
      });
  }, [symbol]);

  return data;
};

export const useTokenPriceChangeFromBinance = (symbol) => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    symbol &&
      axios(BINANCE_API_URL + symbol + "USDT").then((resp) => {
        if (resp) {
          setData(parseFloat(resp.priceChangePercent));
        }
      });
  }, [symbol]);

  return data;
};
