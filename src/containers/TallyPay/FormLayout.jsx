import { useReducer } from 'react';
import { PlusIcon, XIcon } from '@heroicons/react/solid';
import {
    SelectTokenCombobox,
    TPDoubleInput,
    TPInput,
    TPPasswordInputs,
} from '../../components';
import { produce } from 'immer';
import { nanoid } from 'nanoid';

const reducer = (state, action) => {
    switch (action.type) {
        case 'addInheritor':
            return produce(state, draft => {
                draft.formData.inheritors.push({
                    id: nanoid(),
                    email: '',
                    address: '',
                });
            });
        case 'removeInheritor':
            return produce(state, draft => {
                draft.formData.inheritors.splice(action.index, 1);
            });
        case 'updateInheritor':
            return produce(state, draft => {
                draft.formData.inheritors[action.index][action.field] =
                    action.value;
            });
        case 'updateFormData':
            return produce(state, draft => {
                draft.formData[action.field] = action.value;
            });
        default:
            return state;
    }
};

const FormLayout = () => {
    const [state, dispatch] = useReducer(reducer, {
        formData: {
            token: '',
            address: '',
            amount: '',
            amountUSD: '',
            password: '',
            confirmPassword: '',
            inheritors: [
                {
                    id: nanoid(),
                    email: '',
                    address: '',
                },
            ],
        },
    });

    console.log(state.formData);

    return (
        <form
            className='container mx-auto min-h-screen max-w-xl'
            onSubmit={e => {
                e.preventDefault();
                console.log(state);
            }}
        >
            <div className='w-full'>
                <SelectTokenCombobox />
            </div>

            <div className='mt-4 w-full'>
                <TPInput
                    label='Click here to paste Address'
                    name='address'
                    dispatch={dispatch}
                />
            </div>

            <div className='mt-6 w-full'>
                <TPDoubleInput
                    label='Amount'
                    name='amount'
                    rightIcon='BNB'
                    bottomLabel='Amount in USD'
                    bottomRightIcon='USD'
                    bottomName='amountUSD'
                    dispatch={dispatch}
                />
            </div>

            <div className='mt-6 w-full'>
                {state.formData.inheritors.map((inheritor, index) => (
                    <>
                        <p
                            key={`${inheritor.id}-label`}
                            className='inline-flex items-center text-sm font-normal text-tallyPay-primaryText'
                        >
                            Inheritor {index + 1} wallet address{' '}
                            {index > 0 && (
                                <XIcon
                                    className='ml-3 h-4 w-4 cursor-pointer text-tallyPay-red'
                                    onClick={() =>
                                        dispatch({
                                            type: 'removeInheritor',
                                            index,
                                        })
                                    }
                                />
                            )}
                        </p>
                        <TPDoubleInput
                            name='address'
                            placeholder='Click here to paste Address'
                            bottomPlaceholder='Click here to paste Email Address'
                            bottomName='email'
                            bottomType='email'
                            fee='0.0'
                            key={`${inheritor.id}-input`}
                            dispatch={dispatch}
                            index={index}
                        />
                    </>
                ))}

                <button
                    type='button'
                    className='mr-2 inline-flex items-center rounded-full bg-tallyPay-gray-default px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-tallyPay-gray-light focus:outline-none'
                    onClick={() => dispatch({ type: 'addInheritor' })}
                >
                    <PlusIcon className='mr-2 -ml-1 h-5 w-5' />
                    Add More Addresses
                </button>
            </div>

            <div className='mt-6 w-full'>
                <TPPasswordInputs
                    dispatch={dispatch}
                    password={state.formData.password}
                    confirmPassword={state.formData.confirmPassword}
                />
            </div>
        </form>
    );
};

export default FormLayout;
