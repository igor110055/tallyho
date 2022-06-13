import clock from "../tally-pay/clock.png";
import holdingHand from "../tally-pay/hand.png";
import sunRise from "../tally-pay/light.png";

import freeIcon from "../tally-pay/free.svg";
import reliabilityIcon from "../tally-pay/reliability.svg";
import safeIcon from "../tally-pay/safe.svg";

export const fakeData = [
    {
        id: 1,
        title: "Similar To Bank Account",
        details: [
            "Free Deposits and Withdrawals.",
            "Total Control over your money.",
        ],
    },
    {
        id: 2,
        title: "Safer than Holding Crypto in Wallet",
        details: [
            "Funds Retrievable even if you lose access to wallet.",
            "Automatically sent to the wallets of beneficiaries.",
        ],
    },
    {
        id: 3,
        title: "Time Lock and Release",
        details: [
            "Time release mechanism sending funds to multiple wallets on set dates and times",
        ],
    },
];

export const accountsData = [
    {
        id: 1,
        title: "Living",
        name: "Trusts Account",
        img: holdingHand,
        details: [
            "Tokens placed in this account can be time locked.",
            "add/remove tokens any time 24/7.",
            "Stable coin friendly USDT,  BUSD, USDC (ON BSC NETWORK).",
            "Tokens released and sent to recipients when time lock expires.",
        ],
        href: 'https://tallypaydefi.tally-ho.org/guides/readme/types-of-defi-accounts/living-trust-defi-account'
    },
    {
        id: 2,
        title: "Tally",
        name: " Wills Account",
        img: sunRise,
        details: [
            "Lock away your tokens by depositing into account.",
            "set multiple wallets.",
            "add/remove tokens any time 24/7.",
            "Tokens released and sent to beneficiaries when triggered.",
            "Stable coin friendly/Compatible with all BSC TOKENS.",
        ],
        href: 'https://tallypaydefi.tally-ho.org/guides/readme/types-of-defi-accounts/tally-wills-defi-account'
    },
    {
        id: 3,
        title: "Temp",
        name: "Lock Account",
        img: clock,
        details: [
            "lock Tokens temporarily (Maximum 21 Days).",
            "Set multiple wallets. ",
            "Stable coin friendly USDT,  BUSD, USDC (ON BSC NETWORK).",
            "Tokens released and sent to recipients if time lock expires.",
            "Locked tokens are removable by account owner at any time. 24/7.",
        ],
        href: 'https://tallypaydefi.tally-ho.org/guides/readme/types-of-defi-accounts/temp-lock-defi-account'
    },
];

export const plans = [
    {
        id: 1,
        title: "Temp lock",
        details: [
            "21 Day DeFi Account.",
            "Holidays, Medical Op etc.",
            "Stable coin friendly USDT, BUSD, USDC (ON BSC NETWORK)",
            "0.2 BNB or 1,300,000 $Tally.",
        ],
        href: 'temp-lock',
    },
    {
        id: 2,
        title: "Living Trusts",
        details: [
            "Lifetime DeFi Account.",
            "Stable coin friendly USDT, BUSD, USDC (ON BSC NETWORK)",
            "0.8 BNB or 5,200,000 $Tally.",
        ],
        href: 'living-trusts',
    },
    {
        id: 3,
        title: "Tally Wills",
        details: [
            "Lifetime DeFi Account.",
            "Automated Will Executor.",
            "Stable coin friendly USDT, BUSD, USDC (ON BSC NETWORK)",
            "1 BNB ot 7,200,000 $Tally.",
        ],
        href: 'tally-wills',
    },
];


export const valdata = [
    {
        id: 1,
        title: "free",
        description: "Deposits and Withdrawals",
        img: freeIcon,
    },
    {
        id: 2,
        title: "safe",
        description: "Seed phrase Loss protection service.",
        img: safeIcon,
    },
    {
        id: 3,
        title: "reliability",
        description: "Audit Passed (Funds safe and secure)",
        img: reliabilityIcon,
    },
];