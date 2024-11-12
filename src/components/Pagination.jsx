import React, { useEffect, useState } from "react";

import "./Pagination.css";

const Pagination = ({
                        products,
                        dataCountPerPage,
                        setCurrentPage,
                        currentPage,
                    }) => {

    const pagesCount = Math.ceil(products?.length/dataCountPerPage);
    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        const pageNumbers = [];
        const range = 3;

        let startPage = currentPage - 1;
        let endPage = currentPage + 1;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(range, pagesCount);
        }

        if (endPage > pagesCount) {
            endPage = pagesCount;
            startPage = Math.max(pagesCount - range + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        setPageNumbers(pageNumbers)
    }, [currentPage, pagesCount])



    const handleNext = () => {
        if (currentPage < pagesCount) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='pagination'>
            <button
                className={`arrow ${currentPage === 1 ? "disabled" : ""}`}
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                &laquo;
            </button>
            {
                pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? "active" : ""}
                    >
                        {page}
                    </button>
                ))
            }
            <button
                className={`arrow ${currentPage === pagesCount ? "disabled" : ""}`}
                onClick={handleNext}
                disabled={currentPage === pagesCount}
            >
                &raquo;
            </button>
        </div>
    );
};

export default Pagination;