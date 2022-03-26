import {
    FarmHeader,
    FarmOptions,
    FarmsContainer,
    LaunchpadContainer,
} from '../containers';

const FarmsPage = () => {
    return (
        <main className='bg-primary-sidebar'>
            <FarmHeader />

            <section className='container mx-auto max-w-6xl py-6 px-4 md:px-8'>
                <FarmOptions />
                <FarmsContainer />
                <LaunchpadContainer />
            </section>
        </main>
    );
};

export default FarmsPage;
