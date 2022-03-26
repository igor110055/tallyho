import { FarmHeader, FarmOptions, FarmsContainer } from '../containers';

const FarmsPage = () => {
    return (
        <main className='bg-primary-sidebar'>
            <FarmHeader />

            <section className='container mx-auto max-w-5xl py-6 px-8'>
                <FarmOptions />
                <FarmsContainer />
            </section>
        </main>
    );
};

export default FarmsPage;
