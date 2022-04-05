import { farmsData } from '../../assets/data/farmsData';
import { FarmCard } from '../../components';

const FarmsContainer = () => {
    return (
        <div className='my-4 mb-16 rounded-2xl bg-white'>
            {farmsData.map(farm => (
                <FarmCard key={farm.id} item={farm} />
            ))}
        </div>
    );
};

export default FarmsContainer;
