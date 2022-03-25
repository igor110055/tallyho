import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { PlusCircleIcon } from '@heroicons/react/solid';
import { bannerData } from '../../assets/data/bannerData';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const HeaderSection = () => {
    return (
        <div className='bg-pools_header'>
            <div className='container mx-auto grid max-w-6xl grid-cols-2 p-6 pt-28'>
                <div className='space-y-4'>
                    <h1 className='text-[40px] font-semibold text-white'>
                        Tally Pools
                    </h1>
                    <p className='font-light leading-5 text-[#dddddd]'>
                        Stake your tokens – And earn
                        <br />
                        It is as simple as that. Very low fees and high yields
                    </p>
                    <a
                        href='#add_product'
                        className='flex items-center space-x-2 text-sm text-primary-brand'
                    >
                        <span>Add Product</span>
                        <PlusCircleIcon className='h-5 w-5' />
                    </a>
                </div>

                <Carousel
                    infiniteLoop
                    autoPlay
                    showThumbs={false}
                    showArrows={false}
                    showIndicators={false}
                    showStatus={false}
                    swipeable
                    emulateTouch
                    stopOnHover
                >
                    {bannerData.map(item => (
                        <a
                            href={item.url}
                            key={item.id}
                            className='ml-auto flex w-full max-w-md rounded-lg'
                        >
                            <img
                                src={item.image}
                                alt={'banner'}
                                className='ml-auto h-full w-full rounded-lg object-cover'
                            />
                        </a>
                    ))}
                </Carousel>
            </div>

            <div className='container mx-auto mt-6 flex max-w-5xl space-x-5 px-6'>
                <NavLink
                    to='stake_tally'
                    end
                    className={({ isActive }) =>
                        classNames(
                            'rounded-lg rounded-b-none px-7 py-3 font-semibold text-white',
                            {
                                'bg-primary-brand': isActive,
                            }
                        )
                    }
                >
                    Stake Tally
                </NavLink>
                <NavLink
                    to='stake_tokens'
                    end
                    className={({ isActive }) =>
                        classNames(
                            'rounded-lg rounded-b-none px-7 py-3 font-semibold text-white',
                            {
                                'bg-primary-brand': isActive,
                            }
                        )
                    }
                >
                    Stake Tokens
                </NavLink>
            </div>
        </div>
    );
};

export default HeaderSection;
