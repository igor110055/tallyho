import { useReducer } from 'react';
import { FormTab } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import {
    LivingTrustAdd,
    LivingTrustNew,
    LivingTrustRecovery,
    LivingTrustRecurring,
    LivingTrustRemove,
} from '../../containers';
import { produce } from 'immer';
import Loader from 'react-spinners/RingLoader';
import tallyPayLogo from '../../assets/images/tally-pay/logo-bg-removed.png';

const tabs = [
    { name: 'New' },
    { name: 'Add' },
    { name: 'Remove' },
    // { name: 'Recurring Payout' },
    { name: 'Recovery' },
];

const LivingTrust = () => {
    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'SET_TAB':
                    return produce(state, draft => {
                        draft.currentTab = action.tab;
                    });
                default:
                    return state;
            }
        },
        {
            currentTab: tabs[0].name,
            tabs,
        }
    );
    const toggle = useSelector(state => {
        return state.adoptReducer.toggle;
    });

    return (
        <div className='container mx-auto my-10 h-full max-w-6xl'>
            <div className='flex h-full flex-col items-center justify-center'>
                <div className='mb-6'>
                    <img
                        src={tallyPayLogo}
                        alt='logo of tally pay'
                        className='w-20'
                    />
                </div>
                <h1 className='text-center text-5xl font-medium tracking-wider text-white'>
                    <span className='underline decoration-primary-brand decoration-2 underline-offset-4'>
                        Living
                    </span>{' '}
                    Trust
                </h1>

                <div className='container mt-12 max-w-4xl overflow-hidden rounded-lg bg-tallyPay-dark'>
                    <FormTab
                        tabs={state.tabs}
                        currentTab={state.currentTab}
                        dispatch={dispatch}
                    />

                    {state.currentTab === 'New' && <LivingTrustNew />}
                    {state.currentTab === 'Add' && <LivingTrustAdd />}
                    {state.currentTab === 'Remove' && <LivingTrustRemove />}
                    {/* {state.currentTab === 'Recurring Payout' && (<LivingTrustRecurring />
                )} */}
                    {state.currentTab === 'Recovery' && <LivingTrustRecovery />}
                </div>
            </div>
        </div>
    );
};

export default LivingTrust;

// export default LivingTrust;
