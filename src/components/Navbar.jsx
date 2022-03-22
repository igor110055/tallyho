import { Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuAlt4Icon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';
import { classNames } from '../utils/classNames';

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
];

const Navbar = ({ setSidebarOpen }) => {
    return (
        <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white'>
            <button
                type='button'
                className='focus:ring-primary-black border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset md:hidden'
                onClick={() => setSidebarOpen(true)}
            >
                <span className='sr-only'>Open sidebar</span>
                <MenuAlt4Icon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div className='flex w-full flex-1 justify-between px-4 md:px-0'>
                <div className='ml-auto flex items-center'>
                    <button
                        type='button'
                        className='focus:ring-primary-black rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2'
                    >
                        <span className='sr-only'>View notifications</span>
                        <BellIcon className='h-6 w-6' aria-hidden='true' />
                    </button>

                    <Menu as='div' className='relative ml-3'>
                        <div>
                            <Menu.Button className='focus:ring-primary-black flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2'>
                                <span className='sr-only'>Open user menu</span>
                                <img
                                    className='h-10 w-10 rounded-full'
                                    src='https://avatars.dicebear.com/api/bottts/yourtom-seed.svg'
                                    alt=''
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                        >
                            <Menu.Items className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                {userNavigation.map(item => (
                                    <Menu.Item key={item.name}>
                                        {({ active }) => (
                                            <a
                                                href={item.href}
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block py-2 px-4 text-sm text-gray-700'
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
