import { useState, useEffect } from "react";
import axios from "axios";
import { utils } from "ethers";

import { PANCAKESWAP_API_URL } from "../assets/data/urls";

export const useTokenPrice = (address) => {
  const [price, setPrice] = useState(undefined);

  useEffect(() => {
    address &&
      utils.isAddress(address) &&
      axios(PANCAKESWAP_API_URL + address).then((resp) => {
        if (resp && resp.data && resp.data.data) {
          setPrice(parseFloat(resp.data.data.price));
        }
      });
  }, [address]);

  return price;
};
