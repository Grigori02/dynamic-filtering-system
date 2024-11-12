import React, { useState } from 'react';
import './DrpMenu.css';
import { MenuOutlined } from '@ant-design/icons';
import FilterSidebar from "./FilterSidebar";

const DrpMenu = ({ setFilters, filters, handleSort }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="drpMenu">
            <div className="menuIcon" onClick={toggleMenu}>
                <MenuOutlined />
            </div>


            {isOpen && (
                <div className="menuSection">
                    <FilterSidebar filters={filters} setFilters={setFilters} handleSort={handleSort} setIsOpen={setIsOpen}/>
                </div>
            )}
        </div>
    );
};

export default DrpMenu;
