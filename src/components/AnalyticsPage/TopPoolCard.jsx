import millify from 'millify';
import { Link } from 'react-router-dom';

const TopPoolCard = ({ item }) => {
    return (
        <Link to={`pool/${item.hash}`}>
            <div className='grid grid-cols-analytics items-center gap-5 bg-white p-6 text-sm text-primary-darkText transition-colors duration-200 hover:bg-slate-200 '>
                <span className='text-xs font-semibold text-[#708db7]'>
                    {item.id}
                </span>
                <div className='flex items-center'>
                    <div className='flex flex-row items-center -space-x-2'>
                        <img
                            className='z-10 h-6 w-6 rounded-full shadow-md'
                            src={item.firstTokenIcon}
                            alt={item.firstToken}
                        />
                        <img
                            className='h-6 w-6 rounded-full shadow-md'
                            src={item.secondTokenIcon}
                            alt={item.secondToken}
                        />
                    </div>

                    <div className='ml-8 flex items-center text-sm font-semibold uppercase text-[#708db7]'>
                        <span>{item.firstToken}</span>
                        <span>/</span>
                        <span>{item.secondToken}</span>
                    </div>
                </div>
                <span className='font-semibold'>
                    {`$${millify(item.volume24h, {
                        precision: 2,
                    })}`}
                </span>
                <span className='font-semibold'>
                    {`$${millify(item.volume7d, {
                        precision: 2,
                    })}`}
                </span>
                <span className='font-semibold'>
                    {`$${millify(item.lpRewardFees, {
                        precision: 2,
                    })}`}
                </span>
                <span className='font-semibold text-green-500'>
                    {`+${item.lpRewardAPR}%`}
                </span>

                <span className='font-semibold'>
                    {`$${millify(item.liquidity, {
                        precision: 2,
                    })}`}
                </span>
            </div>
        </Link>
    );
};

export default TopPoolCard;
