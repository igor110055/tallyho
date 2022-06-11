import {
  TALLY as TallyAddress,
  WBNB as WBNBAddress,
  XRP as XRPAddress,
  ETH as ETHAddress,
  ADA as ADAAddress,
  DOT as DOTAddress,
  LINK as LINKAddress,
  BTCB as BTCBAddress,
  DOGE as DOGEAddress,
  AVAX as AVAXAddress,
  UNI as UNIAddress,
} from "./addresses";

import tallyIcon from "../images/logo1.png";
import bnbIcon from "../images/tokens/bnb.svg";
import xrpIcon from "../images/tokens/XRP.png";
import ethIcon from "../images/tokens/ETH.png";
import adaIcon from "../images/tokens/ada.svg";
import dotIcon from "../images/tokens/dot.svg";
import linkIcon from "../images/tokens/LINK.png";
import btcbIcon from "../images/tokens/btcb.svg";
import dogeIcon from "../images/tokens/doge.svg";
import avaxIcon from "../images/tokens/avax.svg";
import uniIcon from "../images/tokens/uni.svg";

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
    nick: "BNB",
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

export const XRP = {
  56: {
    name: "XRP",
    symbol: "XRP",
    isNative: false,
    isBase: false,
    address: XRPAddress?.[56] ?? 0x0,
    logo: xrpIcon,
  },
};

export const ETH = {
  56: {
    name: "ETH",
    symbol: "ETH",
    isNative: false,
    isBase: false,
    address: ETHAddress?.[56] ?? 0x0,
    logo: ethIcon,
  },
};

export const ADA = {
  56: {
    name: "ADA",
    symbol: "ADA",
    isNative: false,
    isBase: false,
    address: ADAAddress?.[56] ?? 0x0,
    logo: adaIcon,
  },
};

export const DOT = {
  56: {
    name: "DOT",
    symbol: "DOT",
    isNative: false,
    isBase: false,
    address: DOTAddress?.[56] ?? 0x0,
    logo: dotIcon,
  },
};

export const LINK = {
  56: {
    name: "LINK",
    symbol: "LINK",
    isNative: false,
    isBase: false,
    address: LINKAddress?.[56] ?? 0x0,
    logo: linkIcon,
  },
};

export const BTCB = {
  56: {
    name: "BTCB",
    symbol: "BTCB",
    nick: "BTC",
    isNative: false,
    isBase: false,
    address: BTCBAddress?.[56] ?? 0x0,
    logo: btcbIcon,
  },
};

export const DOGE = {
  56: {
    name: "DOGE",
    symbol: "DOGE",
    isNative: false,
    isBase: false,
    address: DOGEAddress?.[56] ?? 0x0,
    logo: dogeIcon,
  },
};

export const AVAX = {
  56: {
    name: "AVAX",
    symbol: "AVAX",
    isNative: false,
    isBase: false,
    address: AVAXAddress?.[56] ?? 0x0,
    logo: avaxIcon,
  },
};

export const UNI = {
  56: {
    name: "UNI",
    symbol: "UNI",
    isNative: false,
    isBase: false,
    address: UNIAddress?.[56] ?? 0x0,
    logo: uniIcon,
  },
};

export const supportedTokens = {
  56: [
    TALLY["56"],
    WBNB["56"],
    XRP["56"],
    ETH["56"],
    ADA["56"],
    DOT["56"],
    LINK["56"],
    BTCB["56"],
    DOGE["56"],
    AVAX["56"],
    UNI["56"],
  ],
  97: [TALLY["97"], WBNB["97"]],
};
