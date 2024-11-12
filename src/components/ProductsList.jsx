import React from 'react';
import ProductCard from "./ProductCard";
import "./ProductsList.css";

const ProductsList = ({documentsPerPage}) => {
    return (
        <div className="products">
            {
                documentsPerPage.map((item) => <ProductCard key={item.id} item={item}/>)
            }
        </div>
    );
};

export default ProductsList;