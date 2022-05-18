import { RadioGroup } from '@headlessui/react';
import classNames from 'classnames';
const TPChangeInheritorRadio = ({ options, value, onChange }) => {
    return (
        <div className='mt-4'>
            <div className='flex items-center justify-between'>
                <h2 className='text-sm font-medium text-tallyPay-primaryText'>
                    Change Inheritor wallet Address
                </h2>
            </div>

            <RadioGroup value={value} onChange={onChange} className='mt-2'>
                <RadioGroup.Label className='sr-only'>
                    Choose a wallet
                </RadioGroup.Label>
                <div className='grid grid-cols-3 gap-3 sm:grid-cols-5'>
                    {options?.map((option, index) => (
                        <RadioGroup.Option
                            key={option.name}
                            value={option}
                            className={({ checked }) =>
                                classNames(
                                    checked
                                        ? 'text-tallyborder-tallyPay-primaryText hover:bg-tallyborder-tallyPay-primaryText/50 border-tallyPay-primaryText'
                                        : 'border-white/50 text-white/50 hover:bg-tallyPay-primaryText/30',
                                    'flex cursor-pointer items-center justify-center rounded-full border bg-transparent py-2 px-3 text-sm font-light sm:flex-1'
                                )
                            }
                        >
                            <RadioGroup.Label as='p'>
                                {option.value}
                            </RadioGroup.Label>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
};

export default TPChangeInheritorRadio;
