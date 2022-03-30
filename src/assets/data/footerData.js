import {
    FaTelegramPlane,
    FaTwitter,
    FaYoutube,
    FaMedium,
} from 'react-icons/fa';

const serviceItems = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'Tally Token',
        href: '/bsw_token',
    },
    {
        title: 'Apply to Launch',
        href: 'https://forms.gle/V8sQfCi5aBesL2ya8',
        external: true,
    },
];

const productItems = [
    {
        title: 'Exchange',
        href: '/swap',
    },
    {
        title: 'Liquidity',
        href: '/liquidity',
    },
    {
        title: 'Farms',
        href: '/farms',
    },
    {
        title: 'Pools',
        href: '/pools',
    },
    {
        title: 'Analytics',
        href: '/analytics',
    },
];

const aboutItems = [
    {
        title: 'Docs',
        href: '/docs',
    },
    {
        title: 'News',
        href: 'https://tally.zendesk.com/hc/en-us',
        external: true,
    },
    {
        title: 'Audit',
        href: '/',
    },
];


const socialItems = [
    {
        title: 'Telegram',
        children: [
            {
                id: 'arabic',
                title: 'Arabic',
                href: 'https://t.me/Tally_token_arabic',
            },
            {
                id: 'asian',
                title: "Asian",
                href: "https://t.me/tallytokenasia",
            },
            {
                id: 'nigeria',
                title: "Nigeria",
                href: "https://t.me/tallytokennigeria",
            },
            {
                id: 'kenya',
                title: "Kenya",
                href: "https://t.me/tallytokenkenya",
            },
            {
                id: 'france',
                title: "La France",
                href: "https://t.me/tallytokenfrance",
            },
            {
                id: 'portugal',
                title: "Portugal",
                href: "https://t.me/tallytokenportugal",
            }
        ],
        Icon: FaTelegramPlane,
    },
    {
        title: 'Twitter',
        href: 'https://twitter.com/tallytoken',
        Icon: FaTwitter
    },

    {
        title: 'Medium',
        href: 'https://tally-ho.medium.com/',
        Icon: FaMedium
    },
    {
        title: 'Youtube',
        href: 'https://www.youtube.com/channel/UCzen2egOlFIEJW1Se8DCPEw',
        Icon: FaYoutube
    }
]


export {
    serviceItems,
    productItems,
    aboutItems,
    socialItems,
}