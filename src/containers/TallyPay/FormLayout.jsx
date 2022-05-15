import { SelectTokenCombobox } from '../../components';

const FormLayout = () => {
    return (
        <div className='container mx-auto min-h-screen max-w-xl'>
            <div className='col-span-3 sm:col-span-2'>
                <SelectTokenCombobox />
            </div>
        </div>
    );
};

export default FormLayout;
