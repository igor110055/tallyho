import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { navigation } from '../assets/data/sidebarData';
import { classNames } from '../utils/classNames';

import { XIcon } from '@heroicons/react/solid';
import { NavLink } from 'react-router-dom';

const SidebarMobile = ({ setSidebarOpen, sidebarOpen }) => {
    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 z-40 flex md:hidden'
                onClose={setSidebarOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter='transition-opacity ease-linear duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='transition-opacity ease-linear duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <Dialog.Overlay className='fixed inset-0 bg-gray-700 bg-opacity-75' />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter='transition ease-in-out duration-300 transform'
                    enterFrom='-translate-x-full'
                    enterTo='translate-x-0'
                    leave='transition ease-in-out duration-300 transform'
                    leaveFrom='translate-x-0'
                    leaveTo='-translate-x-full'
                >
                    <div className='relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-in-out duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in-out duration-300'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <div className='absolute top-0 right-0 -mr-12 pt-2'>
                                <button
                                    type='button'
                                    className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className='sr-only'>
                                        Close sidebar
                                    </span>
                                    <XIcon
                                        className='h-6 w-6 text-white'
                                        aria-hidden='true'
                                    />
                                </button>
                            </div>
                        </Transition.Child>

                        <div className='mt-5 h-0 flex-1 overflow-y-auto'>
                            <nav className='space-y-1 px-2'>
                                {navigation.map(item => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={({ isActive }) =>
                                            classNames(
                                                isActive
                                                    ? 'text-primary-black bg-gray-100'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                'group flex items-center rounded-md py-2 px-2 text-sm font-medium'
                                            )
                                        }
                                        end
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <item.icon
                                                    className={classNames(
                                                        isActive
                                                            ? 'text-primary-black'
                                                            : 'text-gray-400 group-hover:text-gray-500',
                                                        'mr-3 h-6 w-6 flex-shrink-0'
                                                    )}
                                                    aria-hidden='true'
                                                />
                                                {item.name}
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </div>
                </Transition.Child>
                <div className='w-14 flex-shrink-0'></div>
            </Dialog>
        </Transition.Root>
    );
};

export default SidebarMobile;
