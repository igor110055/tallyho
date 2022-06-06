import { TALLY, WBNB } from "../consts/addresses";
import bnbIcon from "../assets/images/tokens/bnb.svg";
import tallyIcon from "../assets/images/logo1.png";

// This information should be in the contract.
export const supportedTokens = {
  56: [
    {
      name: "Tally",
      symbol: "Tally",
      isNative: false,
      isBase: true,
      address: TALLY?.[56] ?? 0x0,
      logo: tallyIcon,
    },
    {
      name: "Wrapped BNB",
      symbol: "WBNB",
      isNative: false,
      isBase: true,
      address: WBNB?.[56] ?? 0x0,
      logo: bnbIcon,
    },
  ],
  97: [
    {
      name: "Tally",
      symbol: "Tally",
      isNative: false,
      isBase: true,
      address: TALLY?.[97] ?? 0x0,
      logo: tallyIcon,
    },
    {
      name: "Wrapped BNB",
      symbol: "WBNB",
      isNative: false,
      isBase: true,
      address: WBNB?.[97] ?? 0x0,
      logo: bnbIcon,
    },
  ],
};
