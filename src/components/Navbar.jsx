import { MenuAlt4Icon } from '@heroicons/react/solid';
import { FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo2 from '../assets/images/logo2.png';
const Navbar = ({ setSidebarOpen }) => {
    const navigate = useNavigate();

    return (
        <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 bg-primary-dark'>
            <button
                type='button'
                className='focus:ring-primary-black border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset md:hidden'
                onClick={() => setSidebarOpen(true)}
            >
                <span className='sr-only'>Open sidebar</span>
                <MenuAlt4Icon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div className='flex w-full flex-1 justify-between px-10'>
                <div className='flex items-center'>
                    <button
                        type='button'
                        className='mx-4 flex h-10 min-h-[40px] items-center justify-center rounded-lg border border-primary-brand px-4 font-medium text-white transition duration-300 ease-in-out hover:border-white'
                        onClick={() => navigate('/')}
                    >
                        <img src={logo2} alt='logo' className='mr-2 w-5' />
                        <span>Tally Ho Home</span>
                    </button>
                </div>

                <div className='flex items-center'>
                    <button
                        type='button'
                        className='mx-4 flex h-10 min-h-[40px] items-center justify-center rounded-lg bg-primary-brand px-4 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-primary-brand/60'
                    >
                        <span>Connect</span>
                        <FaWallet className='ml-2 opacity-40' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
