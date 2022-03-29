import { PlusIcon } from '@heroicons/react/solid';
import { cardsData } from '../../assets/data/nftmarketplaceData';
import card1 from '../../assets/images/nftMarketplace/card1.png';
import card2 from '../../assets/images/nftMarketplace/card2.png';
import card3 from '../../assets/images/nftMarketplace/card3.png';
import sharehand from '../../assets/images/nftMarketplace/shareHand.png';
import { MarketPageCard } from '../../components';

const Showcase = () => {
    return (
        <div className='bg-elipseBg bg-[length:125%] bg-bottom bg-no-repeat'>
            <div className='container mx-auto mt-20 max-w-6xl'>
                <div className='flex justify-center -space-x-6 text-white'>
                    <div className='relative flex flex-col items-center'>
                        <img src={card1} alt='card1' className='max-w-xs' />
                        <span className='absolute bottom-10 right-[20%] -rotate-12'>
                            Property
                        </span>
                    </div>
                    <div className='relative flex -translate-y-8 flex-col items-center'>
                        <img
                            src={card2}
                            alt='card2'
                            className='z-10 max-w-[18rem]'
                        />
                        <span>Back film / media projects.</span>
                    </div>
                    <div className='relative flex flex-col items-center'>
                        <img src={card3} alt='card3' className='max-w-xs' />
                        <span className='absolute bottom-8 left-[15%] rotate-12'>
                            Business investments.
                        </span>
                    </div>
                </div>

                <h2 className='mx-auto mt-10 max-w-4xl text-center text-white'>
                    Traded as shares, TallyNFTs provide more ways for you to
                    earn back better. Own a share of an asset and earn
                    dividends, capital gains or both!
                </h2>

                <div className='mx-auto my-8 flex justify-center'>
                    <img src={sharehand} alt='sharehand' className='w-44' />
                </div>

                <div className='flex w-full items-center justify-center text-white'>
                    <PlusIcon className='h-10 w-10 ' />
                    <h3 className='text-4xl text-primary-brand_light'>
                        Trade ART and Mint your music onto the blockchain!
                    </h3>
                </div>

                <div className='my-10 flex flex-col items-center'>
                    <h2 className='text-5xl text-white'>
                        <span className='text-primary-brand_light'>Tally</span>
                        NFT Launchpad.
                    </h2>
                    <p className='text-lg text-white'>
                        The presale exclusive area before TallyNFTs enter the
                        marketplace.
                    </p>
                </div>

                <div className='grid grid-cols-2 place-items-center justify-center text-lg font-semibold text-white'>
                    <span>Tally Token Holders.</span>
                    <span>Non-Tally Token Holders.</span>
                </div>

                <div className='mx-auto mt-4 grid max-w-5xl grid-cols-5 gap-4'>
                    {cardsData.map(item => (
                        <MarketPageCard key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Showcase;
