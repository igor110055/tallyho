import { Outlet } from 'react-router-dom';
import { HeaderSection } from '../containers';

const PoolsPage = () => {
    return (
        <div className='bg-primary-sidebar'>
            <HeaderSection />
            <Outlet />
        </div>
    );
};

export default PoolsPage;
