import { FarmCard, PaginateComponent } from '../../components';

const FarmsContainer = ({
    currentItems,
    setCurrentItems,
    itemsPerPage,
    filteredData,
}) => {
    return (
        <>
            <div className='my-4 mb-16 rounded-2xl bg-white'>
                {currentItems.map(farm => (
                    <FarmCard key={farm.id} item={farm} />
                ))}
            </div>
            <PaginateComponent
                dataSets={filteredData}
                itemsPerPage={itemsPerPage}
                setCurrentItems={setCurrentItems}
            />
        </>
    );
};

export default FarmsContainer;
