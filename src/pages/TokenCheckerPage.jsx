import { Outlet, useParams } from 'react-router-dom';
import {
    CoinsTable,
    TokenCheckerHeading,
    TokenCheckerInfo,
} from '../containers';

const TokenCheckerPage = () => {
    const { filter } = useParams();

    return (
        <div className='bg-primary-sidebar'>
            <div className='container mx-auto max-w-7xl  px-6 pt-20'>
                <TokenCheckerHeading />

                {!filter && <CoinsTable />}

                <Outlet />

                <TokenCheckerInfo />
            </div>
            <div className='bg-gradient-to-b from-white to-[#dbdbdb] px-6 pt-24 pb-5'>
                <div className='container max-w-5xl'>
                    <span className=' flex justify-end space-x-1 font-semibold text-[#777777]'>
                        <span>Want to advertise with us? click </span>{' '}
                        <span className='text-primary-brand'> here</span>{' '}
                        <span>the more info</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TokenCheckerPage;
