import { useState } from 'react';
import classNames from 'classnames';
import { CustomSelect, StackedSwitch } from '../../components';

const options1 = [
    { id: 1, name: 'All', value: 'all' },
    { id: 2, name: 'APR', value: 'apr' },
    { id: 3, name: 'Liquidity', value: 'liquidity' },
    { id: 4, name: 'Stable', value: 'stable' },
];

const FarmOptions = () => {
    const [option1, setOption1] = useState(options1[0].value);

    const [status, setStatus] = useState('live');
    return (
        <div className='flex justify-between'>
            <div className='flex items-center space-x-5'>
                <div className='flex space-x-1 rounded-lg bg-white font-semibold'>
                    <button
                        className={classNames('px-4 py-2 font-semibold ', {
                            'rounded-lg bg-primary-brand text-white':
                                status === 'live',
                        })}
                        onClick={() => setStatus('live')}
                    >
                        Live
                    </button>
                    <button
                        className={classNames('px-4 py-2 font-semibold ', {
                            'rounded-lg bg-primary-brand text-white':
                                status === 'archive',
                        })}
                        onClick={() => setStatus('archive')}
                    >
                        Archive
                    </button>
                </div>
                <div className='flex items-center space-x-4'>
                    <StackedSwitch />
                    <span className='leading-6 text-white'>Active Farms</span>
                </div>
            </div>

            <div className='flex items-center space-x-2'>
                <div className='flex w-40 items-center'>
                    <input
                        type='text'
                        placeholder='Search Farms'
                        className='h-10 w-full rounded-lg border border-primary-dark bg-primary-brand p-0 px-4 text-sm text-white outline-none  placeholder:text-white'
                    />
                </div>
                <div className='w-36'>
                    <CustomSelect
                        options={options1}
                        selected={option1}
                        onChange={setOption1}
                    />
                </div>
                <div className='flex w-40 items-center'>
                    <button
                        className='flex h-10 items-center justify-center rounded-lg bg-[#1dc872] px-4 font-semibold text-white disabled:cursor-not-allowed disabled:border disabled:border-primary-brand/80 disabled:bg-primary-brand/80'
                        disabled
                    >
                        Harvest All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FarmOptions;
