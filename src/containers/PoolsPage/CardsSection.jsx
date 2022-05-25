import { StakeTallyCard, StakeTokensCard } from '../../components';
import AutoCompoundCard from '../../components/PoolsPage/AutoCompoundCard';
import { poolsCards } from '../../assets/data/poolsCards';
import { useEffect, useReducer } from 'react';
import { produce } from 'immer';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FILTER_CARD':
            return produce(state, draft => {
                const isActive = action.status === 'active';

                draft.filteredCards = state.cards.filter(card => {
                    return card.active === isActive;
                });
            });
        default:
            return state;
    }
};

const CardsSection = ({ stakeType, status }) => {
    const [state, dispatch] = useReducer(reducer, {
        cards: poolsCards,
        filteredCards: poolsCards,
    });

    const handleFilter = status => {
        dispatch({ type: 'FILTER_CARD', status });
    };

    useEffect(() => {
        handleFilter(status);
    }, [status]);

    return (
        <div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
            {stakeType === 'stake_tally' && (
                <>
                    {state.filteredCards.map(card =>
                        card.autoCompund ? (
                            <AutoCompoundCard key={card.id} card={card} />
                        ) : (
                            <StakeTallyCard
                                key={card.id}
                                earnToken={card.earnToken}
                                stakeToken={card.stakeToken}
                                apyValue={card.apyValue}
                                active={card.active}
                            />
                        )
                    )}
                </>
            )}
            {stakeType === 'stake_tokens' && <StakeTokensCard />}
        </div>
    );
};

export default CardsSection;
