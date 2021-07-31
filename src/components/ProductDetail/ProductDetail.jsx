import React from 'react';
import {useParams} from 'react-router-dom';
import Product from '../Products/Product/Product';

const ProductDetail = ({products}) => {
    const {productId} = useParams();
    const product = products.filter(pd =>pd.id === productId);

    return (
        <div>
            <Product product={product[0]} onAddCart={false}></Product>
        </div>
    );
};

export default ProductDetail;