import { Outlet, useParams } from 'react-router-dom';
import {
    CoinsTable,
    TokenCheckerHeading,
    TokenCheckerInfo,
} from '../containers';

const TokenCheckerPage = () => {
    const { filter } = useParams();

    return (
        <>
            <main className='max-w-7xl bg-primary-sidebar px-6 pt-20'>
                <TokenCheckerHeading />

                {!filter && <CoinsTable />}

                <Outlet />

                <TokenCheckerInfo />
            </main>
            <div className='mt-24 bg-gradient-to-b from-white to-[#dbdbdb] px-6 pb-5'>
                <div className='container max-w-5xl'>
                    <span className='float-right font-semibold text-[#777777]'>
                        Want to advertise with us?{' '}
                        <span className='text-primary-brand'>click here</span>{' '}
                        the more info
                    </span>
                </div>
            </div>
        </>
    );
};

export default TokenCheckerPage;
