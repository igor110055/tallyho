import { useState } from 'react';
import { RadioGroupComp } from '../components';
import { LiquiditySection, SwapSection } from '../containers';

const ExchangePage = () => {
    const types = [
        {
            name: 'Exchange',
            value: 'swap',
        },
        {
            name: 'Liquidity',
            value: 'pool',
        },
    ];

    const [type, setType] = useState(types[0].value);

    return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-primary-sidebar px-4 pt-40 pb-8'>
            <div className='w-full max-w-lg'>
                <h1 className='mb-2 whitespace-nowrap text-center text-[40px] font-bold text-white'>
                    {type === 'swap'
                        ? 'Swap BEP20 Tokens'
                        : 'Become a Liquidity Provider'}
                </h1>

                {type === 'pool' && (
                    <div className='mb-4 flex flex-col text-center text-white'>
                        <h3 className=' text-base font-light'>
                            Earn high yields from transaction fees.
                        </h3>
                        <a
                            href='https://docs.tally.org/education-hub/how-to-earn-on-tally-farms#:~:text=for%20this%20guide.-,Provide%20Liquidity%2C%20Stake%20LP%20tokens%20%26%20Earn%20BSW,-As%20you%20noticed'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='font-semibold text-primary-brand transition-colors hover:text-primary-brand/80'
                        >
                            Learn how to add liquidity
                        </a>
                    </div>
                )}
            </div>

            <RadioGroupComp type={type} setType={setType} types={types} />

            {type === 'swap' && <SwapSection />}
            {type === 'pool' && <LiquiditySection />}
        </div>
    );
};

export default ExchangePage;
