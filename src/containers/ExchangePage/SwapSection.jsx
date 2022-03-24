import { ChevronDownIcon } from '@heroicons/react/solid';
import bnbIcon from '../../assets/images/tokens/bnb.svg';
import tallyIcon from '../../assets/images/tokens/btally.png';
import exchangeImg from '../../assets/images/exchange.png';

import { FaCog } from 'react-icons/fa';
import { GiBackwardTime } from 'react-icons/gi';

const SwapSection = () => {
    return (
        <div className='relative z-10 mt-5 w-full max-w-lg rounded-2xl bg-card_gradient py-4 pb-8 text-white'>
            <div className='flex items-center justify-center p-6'>
                <h2 className='text-lg font-normal leading-6 text-primary-brand_light'>
                    Trades, in an instance:
                </h2>
            </div>

            <div className='grid auto-rows-auto gap-y-3 p-6'>
                {/* From */}
                <div className='flex justify-between px-3'>
                    <span className='text-xl text-primary-brand_light'>
                        From
                    </span>

                    <button className='flex items-center space-x-2'>
                        <img
                            src={bnbIcon}
                            alt='token icon'
                            className='h-6 w-6 rounded-full object-cover'
                        />
                        <span className='text-sm font-semibold'>BNB</span>
                        <ChevronDownIcon className='h-5 w-5 text-primary-brand_light' />
                    </button>
                </div>

                <div className='mt-2 flex w-full flex-row rounded-2xl border border-[#e5eaf2] bg-transparent py-2 px-3'>
                    <input
                        type='number'
                        min={0}
                        inputMode='decimal'
                        title='Token Amount'
                        autoComplete='off'
                        autoCorrect='off'
                        pattern='^[0-9]*[.,]?[0-9]*$'
                        placeholder='0.0'
                        maxLength={79}
                        spellCheck='false'
                        className='relative w-full text-ellipsis border-none bg-transparent font-semibold text-[#708db7] outline-none focus:border-none focus:bg-transparent focus:text-[#708db7] focus:outline-none'
                    />
                </div>

                {/* Exchange Icon */}
                <div className='py-6'>
                    <div className='flex items-center justify-center'>
                        <button>
                            <img
                                src={exchangeImg}
                                alt='exchange icon'
                                className='w-12'
                            />
                        </button>
                    </div>
                </div>

                {/* To */}
                <div className='flex justify-between px-3'>
                    <span className='text-xl text-primary-brand_light'>To</span>

                    <button className='flex items-center space-x-2'>
                        <img
                            src={tallyIcon}
                            alt='token icon'
                            className='h-6 w-6 rounded-full object-cover'
                        />
                        <span className='text-sm font-semibold'>Tally</span>
                        <ChevronDownIcon className='h-5 w-5 text-primary-brand_light' />
                    </button>
                </div>

                <div className='mt-2 flex w-full flex-row rounded-2xl border border-[#e5eaf2] bg-transparent py-2 px-3'>
                    <input
                        type='number'
                        min={0}
                        inputMode='decimal'
                        title='Token Amount'
                        autoComplete='off'
                        autoCorrect='off'
                        pattern='^[0-9]*[.,]?[0-9]*$'
                        placeholder='0.0'
                        maxLength={79}
                        spellCheck='false'
                        className='relative w-full text-ellipsis border-none bg-transparent font-semibold text-[#708db7] outline-none focus:border-none focus:bg-transparent focus:text-[#708db7] focus:outline-none'
                    />
                </div>
            </div>

            {/* Connect Button */}
            <div className='flex items-center justify-center'>
                <button className='flex h-12 cursor-pointer items-center justify-center rounded-3xl bg-primary-brand_light px-6 text-xl font-black text-black transition-opacity duration-200 hover:opacity-80'>
                    Connect Wallet
                </button>
            </div>

            {/* Icon Buttons */}
            <div className='mt-4 flex items-center justify-center space-x-4'>
                <button>
                    <FaCog className='h-6 w-6' />
                </button>

                <button>
                    <GiBackwardTime className='ml-4 h-6 w-6' />
                </button>
            </div>
        </div>
    );
};

export default SwapSection;
