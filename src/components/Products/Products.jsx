import React from 'react';
import {Grid} from '@material-ui/core';
import Product from './Product/Product';
import useStyle from './style.js';

const Products = ({products, onAddCart, onUpdateCart, onRemoveFromCart, onEmptyCart}) => {
    const classes = useStyle();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {
                    products.map(product => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Product onAddCart={onAddCart} product={product}/>
                        </Grid>
                    ))
                }
            </Grid>
        </main>
    );
};

export default Products;