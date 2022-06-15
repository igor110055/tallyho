import btally from '../images/logo1.png';
import btcb from '../images/tokens/btcb.svg';
import eth from '../images/tokens/eth.svg';
import xrp from '../images/tokens/xrp.svg';
import bnb from '../images/tokens/bnb.svg';
import usdt from '../images/tokens/usdt.svg';
import { nanoid } from 'nanoid';

export const poolsCards = [
    {
        id: nanoid(),
        title: "Earn Tally",
        coverImg: btally,
        avatar: btally,
        earnToken: "TALLY",
        stakeToken: "TALLY",
        apyValue: "0.5%",
        autoCompund: false,
        active: true
    },
    {
        id: nanoid(),
        title: "Earn Tally",
        coverImg: btally,
        avatar: btally,
        earnToken: "TALLY",
        stakeToken: "TALLY",
        apyValue: "0.5%",
        autoCompund: true,
        active: true
    },
    {
        id: nanoid(),
        title: "Earn BTCB",
        coverImg: btally,
        avatar: btcb,
        earnToken: "BTCB",
        stakeToken: "TALLY",
        apyValue: "0.5%",
        autoCompund: false,
        active: false
    },
    {
        id: nanoid(),
        title: "Earn ETH",
        coverImg: btally,
        avatar: eth,
        earnToken: "ETH",
        stakeToken: "TALLY",
        apyValue: "0.5%",
        autoCompund: false,
        active: false
    },
    {
        id: nanoid(),
        title: "Earn XRP",
        coverImg: btally,
        avatar: xrp,
        earnToken: "XRP",
        stakeToken: "TALLY",
        apyValue: "0.5%",
        autoCompund: false,
        active: false
    },
    {
        id: nanoid(),
        title: "Earn BNB",
        coverImg: btally,
        avatar: bnb,
        earnToken: "BNB",
        stakeToken: "TALLY",
        apyValue: "0.5%",
        autoCompund: false,
        active: false
    },
    {
        id: nanoid(),
        title: "Earn USDT",
        coverImg: btally,
        avatar: usdt,
        earnToken: "USDT",
        stakeToken: "TALLY",
        apyValue: "0.5%",
        autoCompund: false,
        active: false
    },
]