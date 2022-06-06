import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardsSection, LaunchpadContainer, OptionsHeader } from '../containers';

const PoolsStakeType = () => {
    const { stakeType } = useParams();
    const [status, setStatus] = useState('active');

    return (
        <section className='container mx-auto max-w-5xl bg-primary-sidebar py-8 px-4 md:px-8'>
            <OptionsHeader status={status} setStatus={setStatus} />

            <CardsSection stakeType={stakeType} status={status} />

            <LaunchpadContainer />
        </section>
    );
};

export default PoolsStakeType;
