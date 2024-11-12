import React from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ setFilters, filters, handleSort, setIsOpen }) => {
    return (
        <div className="filter-panel">
            <div className="close-icon" onClick={() => setIsOpen(false)}>X</div>
            <h3>Filters</h3>

            <div>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={filters['name']}
                    onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="category">Category:</label>
                <select id="category" defaultValue={filters['category']} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
                    <option value="">All</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Clothing">Clothing</option>
                </select>
            </div>

            <div>
                <label htmlFor="brand">Brand:</label>
                <select id="brand" defaultValue={filters['brand']} onChange={(e) => setFilters({ ...filters, brand: e.target.value })}>
                    <option value="">All</option>
                    <option value="Brand A">Brand A</option>
                    <option value="Brand B">Brand B</option>
                    <option value="Brand C">Brand C</option>
                    <option value="Brand D">Brand D</option>
                    <option value="Brand E">Brand E</option>
                </select>
            </div>

            <div>
                <label htmlFor="price-range">Price Range: ${filters?.priceRange[0]} - ${filters?.priceRange[1]}</label>
                <input
                    id="price-range"
                    type="range"
                    min="0"
                    max="500"
                    value={filters?.priceRange[0]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [+e.target.value, filters?.priceRange[1]] })}
                />
                <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters?.priceRange[1]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [filters?.priceRange[0], +e.target.value] })}
                />
            </div>

            <div>
                <label htmlFor="rating">Rating:</label>
                <input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    value={filters['rating']}
                    onChange={(e) => setFilters({ ...filters, rating: parseFloat(e.target.value) })}
                />
            </div>

            <h3>Sorting</h3>
            <button className='sorting-btn'  onClick={() => handleSort('price')}>Sort by Price</button>
            <button className='sorting-btn' onClick={() => handleSort('rating')}>Sort by Rating</button>
        </div>
    );
};

export default FilterSidebar;