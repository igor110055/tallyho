import { useState } from 'react';
import { classNames } from '../utils/classNames';
import { navigation } from '../assets/data/sidebarData';
import SidebarMobile from './SidebarMobile';
import Navbar from './Navbar';
import { Link, NavLink } from 'react-router-dom';
import logo1 from '../assets/images/logo1.png';
import logo3 from '../assets/images/logo3.png';

const SidebarWrapper = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <SidebarMobile
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className='hidden md:fixed md:inset-y-0 md:flex md:w-56 md:flex-col'>
                <div className='flex flex-grow flex-col overflow-y-auto border-r border-primary-sidebar bg-primary-sidebar pt-5 text-white'>
                    <div className='mb-4 px-6 transition-all duration-200'>
                        <Link to='/' className='flex items-center'>
                            <img
                                src={logo1}
                                alt='mobile logo'
                                className='w-10'
                            />
                            <img
                                src={logo3}
                                alt='tally ho logo'
                                className='ml-2 hidden w-32 md:block'
                            />
                        </Link>
                    </div>
                    <div className='mt-5 flex flex-grow flex-col'>
                        <nav className='flex-1 space-y-2 px-4 pb-4'>
                            {navigation.map(item => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={({ isActive }) =>
                                        classNames(
                                            isActive
                                                ? 'bg-[#444444] text-[#646464]'
                                                : 'text-white hover:bg-[#444444] hover:text-[#646464]',
                                            'group flex h-12 items-center rounded-lg py-2 px-3 text-sm font-medium transition-colors duration-300'
                                        )
                                    }
                                    end
                                >
                                    <>
                                        <item.icon
                                            className='mr-3 h-5 w-5 flex-shrink-0 fill-white text-white'
                                            aria-hidden='true'
                                        />
                                        {item.name}

                                        <span className=' ml-auto inline-flex items-center justify-center rounded-2xl bg-primary-brand px-2 py-[2px] text-[8px] font-semibold leading-3 text-primary-dark'>
                                            soon
                                        </span>
                                    </>
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            <div className='md:pl-56'>
                <div className='flex flex-col'>
                    <Navbar setSidebarOpen={setSidebarOpen} />

                    {children}
                </div>
            </div>
        </>
    );
};

export default SidebarWrapper;
