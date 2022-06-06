<<<<<<< HEAD
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
    name: "Tally",
    symbol: "Tally",
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
=======
const tokens = [
    {
        id: 1,
        title: 'Vulture, white-headed',
        icon: 'https://robohash.org/etdelenitivoluptate.png?size=50x50&set=set1',
    },
    {
        id: 2,
        title: 'Red brocket',
        icon: 'https://robohash.org/numquamimpeditvoluptatem.png?size=50x50&set=set1',
    },
    {
        id: 3,
        title: 'Suricate',
        icon: 'https://robohash.org/quitemporibuset.png?size=50x50&set=set1',
    },
    {
        id: 4,
        title: 'Bear, polar',
        icon: 'https://robohash.org/sintullambeatae.png?size=50x50&set=set1',
    },
    {
        id: 5,
        title: 'Black-collared barbet',
        icon: 'https://robohash.org/velautvoluptas.png?size=50x50&set=set1',
    },
    {
        id: 6,
        title: 'Water legaan',
        icon: 'https://robohash.org/illomollitiaeligendi.png?size=50x50&set=set1',
    },
    {
        id: 7,
        title: 'Pacific gull',
        icon: 'https://robohash.org/ametvoluptatumin.png?size=50x50&set=set1',
    },
    {
        id: 8,
        title: "Wallaby, bennett's",
        icon: 'https://robohash.org/excepturiharumvoluptas.png?size=50x50&set=set1',
    },
    {
        id: 9,
        title: 'Purple moorhen',
        icon: 'https://robohash.org/accusamusdolorut.png?size=50x50&set=set1',
    },
    {
        id: 10,
        title: 'Red hartebeest',
        icon: 'https://robohash.org/utatquevoluptatem.png?size=50x50&set=set1',
    },
    {
        id: 11,
        title: 'Caiman, spectacled',
        icon: 'https://robohash.org/beataedolorconsequatur.png?size=50x50&set=set1',
    },
    {
        id: 12,
        title: "Francolin, swainson's",
        icon: 'https://robohash.org/nemovelitcupiditate.png?size=50x50&set=set1',
    },
    {
        id: 13,
        title: 'Yellow-billed stork',
        icon: 'https://robohash.org/ducimusmolestiaealiquid.png?size=50x50&set=set1',
    },
    {
        id: 14,
        title: 'Sockeye salmon',
        icon: 'https://robohash.org/etnemocumque.png?size=50x50&set=set1',
    },
    {
        id: 15,
        title: 'Eastern white pelican',
        icon: 'https://robohash.org/dolornihilaut.png?size=50x50&set=set1',
    },
];

export default tokens;
>>>>>>> a4adecda6e0cd0a5e3955d1d625dc301d144c5ac
