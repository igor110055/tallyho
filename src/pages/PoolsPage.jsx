import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { HeaderSection, SliderBanner } from '../containers';

const PoolsPage = () => {
    const { stakeType } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('stakeType', stakeType);

        if (!stakeType) {
            navigate('stake_tally');
        }
    }, [stakeType, navigate]);

    return (
        <div className='bg-primary-sidebar'>
            <HeaderSection />
            <Outlet />
            <SliderBanner />
        </div>
    );
};

export default PoolsPage;
