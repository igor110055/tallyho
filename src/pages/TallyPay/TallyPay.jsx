import { Outlet } from 'react-router-dom';

const TallyPay = () => {
    return (
        <main className='min-h-screen bg-primary-dark pt-20'>
            <Outlet />
        </main>
    );
};

export default TallyPay;