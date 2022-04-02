import { Link } from 'react-router-dom';
import logo2 from '../../assets/images/logo2.png';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { MovingIcons } from '../../components';

const Intro = () => {
    return (
        <section className='bg-intro_bg pt-20'>
            <div className='container mx-auto max-w-6xl px-6 pt-10'>
                <div>
                    <div className='relative mx-auto max-w-lg text-center'>
                        <h2 className='mb-2 flex items-center justify-center font-comfortaa text-[40px] font-semibold'>
                            <img src={logo2} alt='logo' className='mr-2 w-7' />
                            <span className='font-light text-white '>
                                Tally{' '}
                            </span>
                            <span className='font-semibold text-primary-brand'>
                                {' '}
                                &nbsp;Exchange
                            </span>
                        </h2>

                        <span className='block text-lg font-semibold text-white'>
                            A decentralised platform for token swaps, staking,
                            yield farming and auto compounding.
                        </span>
                        <span className='block text-lg font-semibold text-white'>
                            We aim to provide{' '}
                            <span className='text-primary-brand'>
                                competitive
                            </span>{' '}
                            fees.
                        </span>
                    </div>

                    <div className='my-5 flex max-w-xl flex-col space-y-4 rounded-2xl bg-right_gradient p-4 text-xl font-semibold text-white sm:text-2xl'>
                        <span className='pl-5 align-middle leading-6'>
                            Low fees High Yields
                        </span>
                        <span className='pl-20 align-middle leading-6 text-primary-brand'>
                            Youtility
                        </span>
                    </div>

                    <div className='my-5 mt-8 flex w-full max-w-xl rounded-2xl bg-right_gradient p-3 md:p-6 '>
                        <div className='flex items-center border-r border-primary-brand pr-4 md:pr-6'>
                            <img src={logo2} alt='logo' className='h-12 w-12' />
                            <div className='ml-4 sm:mr-4'>
                                <span className='mb-1 block text-xs font-bold leading-6 text-primary-brand'>
                                    Total Value Locked
                                </span>
                                <span className='text-lg font-semibold text-white md:text-2xl'>
                                    $000, 000,000
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <div className='ml-3 md:ml-8'>
                                <span className='mb-1 block text-xs font-bold leading-6 text-primary-brand'>
                                    Total Trading Volume
                                </span>
                                <span className='text-lg font-semibold text-white md:text-2xl'>
                                    $000, 000,000
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='flex max-h-52 w-full justify-center overflow-hidden pt-6 pb-1 '>
                        <MovingIcons />

                        <Link
                            to='/analytics'
                            className='group ml-auto hidden items-center text-white md:flex'
                        >
                            <span>All Markets</span>
                            <ChevronRightIcon className='ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1' />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Intro;
