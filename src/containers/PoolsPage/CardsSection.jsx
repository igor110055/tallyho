import { StakeTallyCard, StakeTokensCard } from '../../components';

const CardsSection = ({ stakeType }) => {
    return (
        <div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
            {stakeType === 'stake_tally' && <StakeTallyCard />}
            {stakeType === 'stake_tokens' && <StakeTokensCard />}
        </div>
    );
};

export default CardsSection;
