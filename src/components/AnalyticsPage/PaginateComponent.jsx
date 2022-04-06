import { useEffect, useState } from 'react';
import { topPools } from '../../assets/data/analyticsData';
import ReactPaginate from 'react-paginate';

const PaginateComponent = ({ itemsPerPage, setCurrentItems }) => {
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(topPools.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(topPools.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, setCurrentItems]);

    const handlePageClick = event => {
        const newOffset = (event.selected * itemsPerPage) % topPools.length;

        setItemOffset(newOffset);
    };
    return (
        <div className='mt-4'>
            <ReactPaginate
                breakLabel='...'
                nextLabel='>'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel='<'
                renderOnZeroPageCount={null}
                containerClassName='flex items-center justify-center space-x-4 my-6 text-sm font-semi-bold text-white'
                previousClassName='bg-primary-darkText px-4 py-2 rounded-lg cursor-pointer'
                disabledClassName='bg-primary-darkText cursor-not-allowed'
                pageClassName='bg-transparent px-4 py-2 rounded-lg cursor-pointer hover:text-[#708db7] transition-colors duration-200'
                activeClassName='bg-primary-darkText/50 px-4 py-2 rounded-lg cursor-pointer'
                nextClassName='bg-primary-darkText px-4 py-2 rounded-lg cursor-pointer'
            />
        </div>
    );
};

export default PaginateComponent;
