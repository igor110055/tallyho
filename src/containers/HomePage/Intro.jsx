import logo2 from '../../assets/images/logo2.png';

const Intro = () => {
    return (
        <div className='bg-intro_bg pt-20'>
            <div className='container mx-auto max-w-6xl px-6 py-16'>
                <div>
                    <div className='relative mx-auto max-w-lg text-center'>
                        <h2 className='mb-2 flex items-center justify-center text-[40px] font-semibold'>
                            <img src={logo2} alt='logo' className='mr-2 w-7' />
                            <span className='text-white'>Tally </span>
                            <span className='text-primary-brand'>
                                {' '}
                                &nbsp;Exchange
                            </span>
                        </h2>

                        <span className='font-semibold text-black'>
                            Beta Version 1.0
                        </span>
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

                    <div className='my-5 flex max-w-xl flex-col space-y-4 rounded-2xl bg-right_gradient p-4 text-2xl font-semibold text-white'>
                        <span className='pl-5 align-middle leading-6'>
                            Low fees High Yields
                        </span>
                        <span className='pl-20 align-middle leading-6 text-primary-brand'>
                            Youtility
                        </span>
                    </div>

                    <div className='my-5 mt-8 grid max-w-xl grid-cols-2 rounded-2xl bg-right_gradient p-6 '>
                        <div className='flex items-center border-r border-primary-brand'>
                            <img src={logo2} alt='logo' className='h-12 w-12' />
                            <div className='ml-4'>
                                <span className='mb-1 block text-xs font-bold leading-6 text-primary-brand'>
                                    Total Value Locked
                                </span>
                                <span className='text-2xl font-semibold text-white'>
                                    $000, 000,000
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <div className='ml-8'>
                                <span className='mb-1 block text-xs font-bold leading-6 text-primary-brand'>
                                    Total Trading Volume
                                </span>
                                <span className='text-2xl font-semibold text-white'>
                                    $000, 000,000
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
