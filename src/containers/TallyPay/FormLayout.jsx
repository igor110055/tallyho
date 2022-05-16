import { SelectTokenCombobox, TPDoubleInput, TPInput } from '../../components';

const FormLayout = () => {
    return (
        <div className='container mx-auto min-h-screen max-w-xl'>
            <div className='w-full'>
                <SelectTokenCombobox />
            </div>

            <div className='mt-4 w-full'>
                <TPInput label='Click here to paste Address' name='address' />
            </div>

            <div className='mt-6 w-full'>
                <TPDoubleInput
                    label='Amount'
                    name='amount'
                    rightIcon='BNB'
                    bottomLabel='Amount in USD'
                    bottomRightIcon='USD'
                    bottomName='amountUSD'
                />
            </div>

            <div className='mt-6 w-full'>
                <p className='block text-sm font-normal text-tallyPay-primaryText'>
                    Inheritor 1 wallet address
                </p>
                <TPDoubleInput
                    name='inheritor1Address'
                    placeholder='Click here to paste Address'
                    bottomPlaceholder='Click here to paste Email Address'
                    bottomName='inheritor1Email'
                    bottomType='email'
                />
            </div>
        </div>
    );
};

export default FormLayout;
