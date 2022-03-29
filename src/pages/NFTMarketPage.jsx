import bannerImg from '../assets/images/nftPageBanner.png';
import { Showcase } from '../containers';

const NFTMarketPage = () => {
    return (
        <div className='bg-primary-sidebar p-6 pt-24'>
            <div className='container mx-auto max-w-6xl'>
                <img src={bannerImg} alt='banner' className='w-full' />
            </div>

            <div className='mt-8 flex justify-center'>
                <div className='text-center'>
                    <h1 className='text-5xl text-primary-brand_light'>
                        NFT Marketplace.
                    </h1>
                    <span className='block w-full text-right text-white'>
                        Coming Soon.
                    </span>
                </div>
            </div>

            <Showcase />

            <div className='mt-4 flex justify-center'>
                <p className='text-lg font-light text-white'>
                    (Investors must hold Tally Tokens or stake BUSD to
                    participate on the Launchpad).
                </p>
            </div>

            <div className='my-20 mx-auto max-w-5xl space-y-14'>
                <h2 className='text-center text-3xl text-white md:text-4xl'>
                    Are you looking for investment in a project? Or do you have
                    an asset to trade as a{' '}
                    <span className='text-primary-brand_light'>Tally</span>NFT?
                </h2>

                <div className='flex justify-center'>
                    <button className='rounded-full bg-[#3889a1] px-10 py-2 text-xl text-white transition duration-200 hover:-translate-y-2 hover:shadow-md hover:shadow-slate-200/20'>
                        Apply Here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NFTMarketPage;
