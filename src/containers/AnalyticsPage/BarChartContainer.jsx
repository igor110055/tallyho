import { BarChartComp } from '../../components';

const BarChartContainer = () => {
    return (
        <div className='w-full bg-gradient-to-b from-primary-brand/5 to-primary-brand p-4 md:p-6'>
            <span className='block text-base font-semibold text-primary-dark'>
                24H Volume
            </span>
            <span className='block align-middle text-2xl font-semibold text-white'>
                $661 471 504
            </span>
            <span className='block align-middle font-normal text-primary-dark'>
                Dec 24, 2021
            </span>
            <div className='mt-4 h-64'>
                <BarChartComp />
            </div>
        </div>
    );
};

export default BarChartContainer;
