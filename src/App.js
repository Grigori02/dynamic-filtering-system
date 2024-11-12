import React, { useMemo, useState, useEffect } from "react";
import { mockData, dataCountPerPage } from "./const";
import { useDebounce } from "./customHooks";
import { getSortedData } from "./utils";
import ProductsList from "./components/ProductsList";
import FilterSidebar from "./components/FilterSidebar";
import Pagination from "./components/Pagination";
import ClipLoader from "react-spinners/ClipLoader";
import DrpMenu from "./components/DrpMenu";

import './App.css';

const localStorageFilters = JSON.parse(localStorage.getItem('filters'));
const initialFiltersState = localStorageFilters || {
  name: "",
  category: "",
  brand: "",
  priceRange: [0, 500],
  rating: 0
}

const localStorageSorts = JSON.parse(localStorage.getItem('sorts'));

const App = () => {
  const [documentsList, setDocumentsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFiltersState);
  const [sortOrder, setSortOrder] = useState({ price: 'asc', rating: 'asc' });

  const debouncedQuery = useDebounce(filters, 500);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      localStorage.setItem('filters', JSON.stringify(debouncedQuery));
      const filteredData = mockData.filter((document) => {
        const searchWithName = debouncedQuery.name ? debouncedQuery.name.toLowerCase() === document.name.toLowerCase() : true;
        const searchWithCategory = debouncedQuery.category ? debouncedQuery.category === document.category : true;
        const searchWithBrand = debouncedQuery.brand ? debouncedQuery.brand === document.brand : true;
        const searchWithRating = debouncedQuery.rating ? debouncedQuery.rating === document.rating : true;
        const searchWithPriceRange = debouncedQuery.priceRange[0] <= document.price && document.price <= debouncedQuery.priceRange[1];
        return searchWithName && searchWithCategory && searchWithBrand && searchWithRating && searchWithPriceRange;
      });

      let sortedFilteredData = [...filteredData];
      const sortValue = Object.keys(localStorageSorts || {})[0];
      const sortType = Object.values(localStorageSorts || {})[0];
      if (sortValue && sortType) {
        sortedFilteredData = getSortedData(sortedFilteredData, sortValue, sortType);
      }

      setDocumentsList(sortedFilteredData);
      setLoading(false);
    }
  }, [debouncedQuery, mockData]);

  const documentsPerPage = useMemo(() => {
    const lastIndex = dataCountPerPage * currentPage;
    const firstIndex = lastIndex - dataCountPerPage;
    return documentsList.slice(firstIndex, lastIndex);
  }, [dataCountPerPage, currentPage, documentsList]);

  const handleSort = (sortValue) => {
    const currentOrder = sortOrder[sortValue];
    const sortType = currentOrder === 'asc' ? 'desc' : 'asc';

    let sortedProducts = [...documentsList];
    sortedProducts = getSortedData(sortedProducts, sortValue, sortType);
    setDocumentsList(sortedProducts);

    setSortOrder({
      ...sortOrder,
      [sortValue]: sortType
    });

    localStorage.setItem('sorts', JSON.stringify({
      [sortValue]: sortType
    }));
  };

  return (
      <div className="content">
        <div className="filter-sidebar">
          <FilterSidebar filters={filters} setFilters={setFilters} handleSort={handleSort} />
        </div>

     <div className="mb-content">
       <DrpMenu filters={filters} setFilters={setFilters} handleSort={handleSort}/>
       {loading ? (
           <ClipLoader
               color={"white"}
               loading={loading}
               cssOverride={{
                 display: "block",
                 margin: "25% 50%",
                 borderColor: "black",
               }}
               size={50}
               aria-label="Loading Spinner"
               data-testid="loader"
           />
       ) : !documentsPerPage.length ? (
           <span className="message">No products found!</span>
       ) : (
           <div>
             <ProductsList documentsPerPage={documentsPerPage} />
             {documentsList.length > dataCountPerPage && (
                 <Pagination products={documentsList} dataCountPerPage={dataCountPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
             )}
           </div>
       )}
     </div>
      </div>
  );
};

export default App;