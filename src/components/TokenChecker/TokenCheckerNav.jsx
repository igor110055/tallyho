import { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { FaTrophy } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs';
import AdvertiseModal from './AdvertiseModal';
import ReportScamModal from './ReportScamModal';

const TokenCheckerNav = ({ onTokenCheckPage }) => {
    const [advertiseOpen, setAdvertiseOpen] = useState(false);
    const [reportScamOpen, setReportScamOpen] = useState(false);

    return (
        <>
            <div
                className={classNames(
                    'mx-auto hidden items-center space-x-2 md:flex',
                    {
                        'md:hidden': !onTokenCheckPage,
                    }
                )}
            >
                <Link
                    to='contest'
                    className='flex items-center space-x-1 rounded-lg px-2 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-black'
                >
                    <FaTrophy />
                    <span>Raffle</span>
                </Link>

                <button
                    className='flex items-center space-x-1 rounded-lg px-2 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-black'
                    onClick={() => setAdvertiseOpen(true)}
                >
                    <span>Advertiese</span>
                    <BsStarFill />
                </button>

                <button
                    className='flex items-center space-x-1 rounded-lg px-2 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-black'
                    onClick={() => setReportScamOpen(true)}
                >
                    <span>Report Scam Token</span>
                </button>

                <button className='flex items-center space-x-1 rounded-lg px-2 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-black'>
                    <span>Watchlist Tokens</span>
                </button>

                <button className='flex items-center space-x-1 rounded-lg px-2 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-black'>
                    <span>Get Doxxed</span>
                </button>
            </div>

            <AdvertiseModal open={advertiseOpen} setOpen={setAdvertiseOpen} />
            <ReportScamModal
                open={reportScamOpen}
                setOpen={setReportScamOpen}
            />
        </>
    );
};

export default TokenCheckerNav;
