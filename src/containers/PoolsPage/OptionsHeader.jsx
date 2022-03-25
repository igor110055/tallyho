import classNames from 'classnames';
import { useState } from 'react';
import { CustomSelect, StackedSwitch } from '../../components';

const options1 = [
    { id: 1, name: 'All', value: 'all' },
    { id: 2, name: 'APR', value: 'apr' },
    { id: 3, name: 'Total Staked', value: 'total' },
];

const options2 = [
    { id: 1, name: '10 TALLY', value: '10' },
    { id: 2, name: '500 TALLY', value: '500' },
    { id: 3, name: 'Unlimited', value: 'unlimited' },
];

const OptionsHeader = () => {
    const [option1, setOption1] = useState(options1[0].value);
    const [option2, setOption2] = useState(options2[0].value);

    const [status, setStatus] = useState('active');
    return (
        <div className='flex justify-between'>
            <div className='flex items-center space-x-5'>
                <div className='flex space-x-1 rounded-lg bg-white font-semibold'>
                    <button
                        className={classNames('px-4 py-2 ', {
                            'rounded-lg bg-primary-brand text-white':
                                status === 'active',
                        })}
                        onClick={() => setStatus('active')}
                    >
                        Active
                    </button>
                    <button
                        className={classNames('px-4 py-2 ', {
                            'rounded-lg bg-primary-brand text-white':
                                status === 'inactive',
                        })}
                        onClick={() => setStatus('inactive')}
                    >
                        Inactive
                    </button>
                </div>
                <div className='flex items-center space-x-4'>
                    <StackedSwitch />
                    <span className='leading-6 text-white'>Stacked Only</span>
                </div>
            </div>

            <div className='flex items-center space-x-2'>
                <div className='w-36'>
                    <CustomSelect
                        options={options1}
                        selected={option1}
                        onChange={setOption1}
                    />
                </div>
                <div className='w-40'>
                    <CustomSelect
                        options={options2}
                        selected={option2}
                        onChange={setOption2}
                    />
                </div>

                <div className='flex w-40 items-center'>
                    <input
                        type='text'
                        placeholder='Search Launchpool'
                        className='h-10 w-full rounded-lg border border-primary-dark bg-primary-brand p-0 px-4 text-sm text-white outline-none  placeholder:text-white'
                    />
                </div>
            </div>
        </div>
    );
};

export default OptionsHeader;
