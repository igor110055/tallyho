import { MenuIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { FaWallet } from 'react-icons/fa';
import { FcApproval } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { TokenCheckerNav } from '..';
import Web3ConnectModal from './Web3ConnectModal';
import logo2 from '../../assets/images/logo2.png';
import ealogo from '../../assets/images/eatherauthority.png';

const Navbar = ({ setSidebarOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [scrolled, setScrolled] = useState(false);
    const [onTokenCheckPage, setOnTokenCheckPage] = useState(false);
    const [connectModalOpen, setConnectModalOpen] = useState(false);

    useEffect(() => {
        if (location.pathname.includes('/tokenchecker')) {
            setOnTokenCheckPage(true);
        } else {
            setOnTokenCheckPage(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={classNames(
                'fixed top-0 right-0 left-0 z-30 flex h-20 flex-shrink-0 bg-primary-dark md:left-56',
                {
                    'bg-transparent': !scrolled,
                }
            )}
        >
            <button
                type='button'
                className='focus:ring-primary-black  px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset md:hidden'
                onClick={() => setSidebarOpen(true)}
            >
                <span className='sr-only'>Open sidebar</span>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div className='flex w-full flex-1 justify-between px-0 md:px-10'>
                <div className='flex items-center'>
                    <div className='flex items-center'>
                        <button
                            type='button'
                            className='mx-4 flex h-10 min-h-[40px] items-center justify-center rounded-lg border border-primary-brand px-4 font-medium text-white transition duration-300 ease-in-out hover:border-white'
                            onClick={() => navigate('/')}
                        >
                            <img
                                src={logo2}
                                alt='logo'
                                className='mr-0 w-5 md:mr-2'
                            />
                            <span className='hidden md:block'>
                                Tally Ho Home
                            </span>
                        </button>
                    </div>

                    <div className='flex items-center'>
                        <button
                            type='button'
                            className='mx-4 hidden items-center justify-center rounded-lg px-4 font-medium text-white md:flex'
                        >
                            <img
                                src={ealogo}
                                alt='Eather Authority Logo'
                                className='mr-0 h-12 rounded-lg object-cover md:mr-2'
                            />
                            <div className='hidden md:block'>
                                <span className='flex items-center font-comfortaa text-xs font-light uppercase'>
                                    Audited by{' '}
                                    <FcApproval className='ml-2 h-4 w-4' />
                                </span>
                                <span className='font-comfortaa'>
                                    EtherAuthority
                                </span>
                            </div>
                        </button>
                    </div>
                </div>

                <TokenCheckerNav onTokenCheckPage={onTokenCheckPage} />

                <div className='flex items-center'>
                    <button
                        type='button'
                        className='mx-4 flex h-10 min-h-[40px] items-center justify-center rounded-lg bg-primary-brand px-4 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-primary-brand/60'
                        onClick={() => setConnectModalOpen(true)}
                    >
                        <span>Connect</span>
                        <FaWallet className='ml-2 opacity-40' />
                    </button>

                    <Web3ConnectModal
                        open={connectModalOpen}
                        setOpen={setConnectModalOpen}
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
