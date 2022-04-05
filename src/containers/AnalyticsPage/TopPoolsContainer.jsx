const TopPoolsContainer = () => {
    return (
        <>
            <h1 className='text-2xl font-semibold text-white'>Top Pools</h1>

            <div className='grid grid-cols-[0px_2fr_repeat(5,_1fr)] items-center gap-4 p-6 text-xs font-semibold text-[#708db7]'>
                <span className='text-white'>#</span>
                <span className='text-white'>Pool</span>
                <span>Volume 24H</span>
                <span>Volume 7D</span>
                <span>LP reward fees 24H</span>
                <span>LP reward APR</span>
                <span>Liquidity</span>
            </div>
        </>
    );
};

export default TopPoolsContainer;
