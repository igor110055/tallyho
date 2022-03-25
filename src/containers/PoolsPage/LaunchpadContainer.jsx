const LaunchpadContainer = () => {
    return (
        <div className='container mx-auto max-w-6xl px-6 py-20'>
            <div className='flex max-w-xl flex-col space-y-4 text-white'>
                <h1 className='pb-4 text-4xl font-semibold'>
                    The Stake Token LaunchPad on Tally!
                </h1>
                <p className='font-normal leading-7 text-[#d3d3d3]'>
                    In Q3, Tally-Ho will be offering a launchpad specially for
                    project owners who are interested in their tokens being
                    readily stake-able on Tally Farms.
                    <br />
                    When a project applies to launch on Tally Exchange, their
                    holders can stake their token immediately on launch.
                    <br />
                    We bring instant value to tokens leading to beneficial
                    partnerships
                </p>
                <p className='font-normal leading-7 text-[#d3d3d3]'>
                    Tally Token holders will have guaranteed, semi-guaranteed
                    and lottery presalespots dependent on amount of tally
                    holdings. <br />
                    Launchpad Coming Soon (more info closer to Q3){' '}
                </p>

                <button className='h-12 max-w-fit rounded-lg bg-primary-brand px-6 text-white'>
                    Apply to Launch
                </button>
            </div>
        </div>
    );
};

export default LaunchpadContainer;
