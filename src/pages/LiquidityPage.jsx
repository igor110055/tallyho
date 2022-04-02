import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { RadioGroupComp, SettingsModal } from '../components';
import { LiquiditySection, SliderBanner, SwapSection } from '../containers';

const LiquidityPage = () => {
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
    const navigate = useNavigate();
    const { coin } = useParams();

    const [type, setType] = useState(types[1].value);
    const [modalOpen, setModalOpen] = useState(false);

    const setTypeandNavigate = type => {
        setType(type);
        navigate('/liquidity');
    };

    const openSettingsModal = () => {
        setModalOpen(true);
    };

    useEffect(() => {
        if (!coin) {
            setType('pool');
        }
    }, [coin]);

    return (
        <>
            <section className='flex min-h-screen flex-col items-center justify-center bg-primary-sidebar px-4 pt-40 pb-8'>
                <div className='w-full max-w-lg'>
                    <h1 className='mb-2 whitespace-nowrap text-center  text-3xl font-bold text-white md:text-[40px]'>
                        {type === 'swap'
                            ? 'Be a Liquidity Provider'
                            : 'Become a Liquidity Provider'}
                    </h1>

                    <h3 className=' text-center text-base font-light text-white'>
                        Receive high yields from earning a share of transaction
                        fees.
                    </h3>

                    {type === 'pool' && (
                        <div className='mb-4 flex flex-col text-center text-white'>
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

                <RadioGroupComp
                    type={type}
                    setType={setTypeandNavigate}
                    types={types}
                />

                {type === 'swap' && !coin && (
                    <SwapSection openSettingsModal={openSettingsModal} />
                )}
                {type === 'pool' && !coin && (
                    <LiquiditySection
                        openSettingsModal={openSettingsModal}
                        setType={setType}
                    />
                )}
                <Outlet />
            </section>

            <SliderBanner />

            <SettingsModal open={modalOpen} setOpen={setModalOpen} />
        </>
    );
};

export default LiquidityPage;
