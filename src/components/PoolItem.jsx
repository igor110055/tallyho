import btally from '../assets/images/tokens/btally.png';
import { MdOutlineCalculate } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PoolItem = () => {
    return (
        <div className='flex h-[90px] flex-row rounded-2xl bg-white py-4 px-6 shadow-2xl transition duration-200 hover:shadow-lg'>
            <div>
                <span className='relative inline-block'>
                    <img className='h-12 w-12' src={btally} alt='token' />
                    <span className='absolute bottom-0 right-0 block translate-y-1/2 translate-x-1/2 transform rounded-full border-2 border-white'>
                        <img
                            className='h-5 w-5 rounded-full'
                            src={btally}
                            alt='token'
                        />
                    </span>
                </span>
            </div>

            <div className='ml-4 flex flex-col space-y-2 border-r-2 border-dotted border-primary-darkText/50 pr-4'>
                <span className='font-comfortaa text-lg font-semibold leading-6 text-primary-darkText'>
                    Auto Compound
                </span>
                <span className='text-xs font-bold text-[#708db7]'>
                    Stake TALLY - Earn TALLY
                </span>
            </div>

            <div className='flex flex-col pl-3 '>
                <div className='flex flex-row items-center justify-between space-x-2 text-xs font-semibold text-[#708db7]'>
                    <span>APY</span>
                    <MdOutlineCalculate className='h-5 w-5' />
                </div>
                <div className='flex flex-row items-center justify-between space-x-2 text-xs text-[#708db7]'>
                    <span className='text-lg text-primary-brand'>{0}%</span>
                </div>
            </div>

            <div className='ml-auto'>
                <Link to='/pools'>
                    <button className='inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-[#e4efff] px-4 text-sm text-primary-brand transition duration-300 hover:bg-[#e4efff]/60'>
                        Stake Tally
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PoolItem;
