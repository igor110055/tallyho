import { Outlet, useParams } from 'react-router-dom';
import { CoinsTable, TokenCheckerHeading } from '../containers';

const TokenCheckerPage = () => {
    const { filter } = useParams();

    return (
        <main className='max-w-7xl bg-primary-sidebar px-6 pt-20'>
            <TokenCheckerHeading />

            {!filter && <CoinsTable />}

            <Outlet />
        </main>
    );
};

export default TokenCheckerPage;
