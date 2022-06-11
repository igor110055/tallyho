import axios from "axios";
import { utils } from "ethers";

import { PANCAKESWAP_API_URL } from "../assets/data/urls";

export const readPricesAndChangesOfTokens = (arr) => {
  let retPrices = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    arr[i] &&
      arr[i].address &&
      utils.isAddress(arr[i].address) &&
      axios(PANCAKESWAP_API_URL + arr[i].address).then((resp) => {
        if (resp && resp.data && resp.data.data) {
          retPrices[i] = resp.data.data.price;
        }
      });
  }

  return retPrices;
};
