import { CheckIcon, SearchIcon } from '@heroicons/react/solid';
import { FaCertificate, FaStar, FaBell, FaChartPie } from 'react-icons/fa';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import tokenCheckerImg from '../../assets/images/tokenChecker/TokenChecker.png';

const routes = [
    {
        id: 'certified',
        path: 'certified',
        icon: CheckIcon,
        label: 'Watchlist Tokens',
    },
    {
        id: 'scam',
        path: 'scam',
        icon: FaCertificate,
        label: 'Scam Tokens',
    },
    {
        id: 'checker',
        path: 'checker',
        icon: FaStar,
        label: 'Copy Contract',
    },
    {
        id: 'doxxed',
        path: 'doxxed',
        icon: FaBell,
        label: 'Doxxed Tokens',
    },
    {
        id: 'advert',
        path: 'advert',
        icon: FaChartPie,
        label: 'Advert',
    },
];

const TokenCheckerHeading = () => {
    return (
        <div className='mx-11 flex flex-col items-center justify-center'>
            <img
                src={tokenCheckerImg}
                alt='token checker'
                className='max-h-32 md:max-h-60'
            />

            <div className='my-2 flex w-full items-center place-self-start'>
                <input
                    type='text'
                    placeholder='Token name or Contract address'
                    className='h-9 w-full max-w-[400px] rounded-sm rounded-r-none border border-[#ced4da] bg-[#1f1f1f] bg-clip-padding py-2 px-3 text-sm font-semibold text-[#495057] shadow-sm focus:border-[#d9d9d9] focus:outline-none focus:drop-shadow-search'
                />
                <div className='flex h-9 items-center bg-[#d3d3d3] px-1 py-1'>
                    <SearchIcon className='h-4 w-4 text-[#495057]' />
                </div>
            </div>

            <div className='flex items-center space-x-1 place-self-start'>
                {routes.map(item => (
                    <NavLink
                        to={item.path}
                        key={item.id}
                        className={({ isActive }) =>
                            classNames(
                                {
                                    'border-b-[5px] border-b-[#211f1f] !text-white':
                                        isActive,
                                },
                                'flex items-center space-x-1 border-[5px] border-b-0 border-l-[#211f1f]  border-t-[#494949] border-r-[#494949] bg-[#262626] py-[10px] px-5 font-semibold text-[#e7cd86]'
                            )
                        }
                        end
                    >
                        <item.icon className='h-6 w-6' />{' '}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default TokenCheckerHeading;
