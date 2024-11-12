import React from 'react';
import { Card } from "antd";
import "./ProductCard.css"

const ProductCard = ({item}) => {
    return (
        <Card
            className='card'
            bordered={true}
        >
            <div>
                <img src={item.imageUrl} alt={item.name} />
                <h4>{item.name}</h4>
                <p>{item.category}</p>
                <p>{item.brand}</p>
                <p>${item.price}</p>
                <p>{item.rating} ⭐️</p>
            </div>
        </Card>
    );
};

export default ProductCard;