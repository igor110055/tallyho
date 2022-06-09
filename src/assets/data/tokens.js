import { TALLY as TallyAddress, WBNB as WBNBAddress } from "./addresses";
import bnbIcon from "../images/tokens/bnb.svg";
import tallyIcon from "../images/logo1.png";

// This information should be in the contract.
export const TALLY = {
  56: {
    name: "Tally",
    symbol: "Tally",
    isNative: false,
    isBase: true,
    address: TallyAddress?.[56] ?? 0x0,
    logo: tallyIcon,
  },
  97: {
    name: "Tally",
    symbol: "Tally",
    isNative: false,
    isBase: true,
    address: TallyAddress?.[97] ?? 0x0,
    logo: tallyIcon,
  },
};

export const WBNB = {
  56: {
    name: "Wrapped BNB",
    symbol: "WBNB",
    isNative: false,
    isBase: true,
    address: WBNBAddress?.[56] ?? 0x0,
    logo: bnbIcon,
  },
  97: {
    name: "Wrapped BNB",
    symbol: "WBNB",
    isNative: false,
    isBase: true,
    address: WBNBAddress?.[97] ?? 0x0,
    logo: bnbIcon,
  },
};

export const supportedTokens = {
  56: [TALLY["56"], WBNB["56"]],
  97: [TALLY["97"], WBNB["97"]],
};
