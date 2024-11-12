import React from 'react';
import {Card, Rate} from "antd";
import "./ProductCard.css"
import Meta from "antd/es/card/Meta";

const ProductCard = ({item}) => {
    return (
        <Card
            role="cardItem"
            className="card"
            bordered={true}
            cover={<img alt={item.name} src={item.imageUrl} />}
        >
            <Meta
                title={item.name}
                description={
                    <div>
                        <p><strong>Category:</strong> {item.category}</p>
                        <p><strong>Brand:</strong> {item.brand}</p>
                        <p><strong>Price:</strong> ${item.price}</p>
                        <p><strong>Rating:</strong> <Rate disabled value={item.rating} /></p>
                    </div>
                }
            />
        </Card>
    );
};

export default ProductCard;