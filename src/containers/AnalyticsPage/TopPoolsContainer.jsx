import { useState } from 'react';
import { topPools } from '../../assets/data/analyticsData';
import { TopPoolCard, PaginateComponent } from '../../components';

const TopPoolsContainer = () => {
    const ITEMS_PER_PAGE = 10;

    // first 10 items of topPools
    const [currentItems, setCurrentItems] = useState(
        topPools.slice(0, ITEMS_PER_PAGE)
    );

    return (
        <>
            <h1 className='text-2xl font-semibold text-white'>Top Pools</h1>

            <div className='grid grid-cols-analytics items-center gap-4 p-6 text-xs font-semibold text-[#708db7]'>
                <span className='text-white'>#</span>
                <span className='text-white'>Pool</span>
                <span>Volume 24H</span>
                <span>Volume 7D</span>
                <span>LP reward fees 24H</span>
                <span>LP reward APR</span>
                <span>Liquidity</span>
            </div>

            <div className='overflow-hidden rounded-2xl bg-white'>
                {currentItems.map(item => (
                    <TopPoolCard key={item.id} item={item} />
                ))}
            </div>

            <PaginateComponent
                itemsPerPage={ITEMS_PER_PAGE}
                setCurrentItems={setCurrentItems}
            />
        </>
    );
};

export default TopPoolsContainer;
