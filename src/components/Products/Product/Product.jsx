import React from 'react';
import {Card, CardContent, CardActions, CardMedia, Typography, IconButton, Button} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';
import useStyle from './style.js';
import {Link} from 'react-router-dom';

const Product = ({product, onAddCart}) => {
    const classes = useStyle();
    console.log(product);
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} title={product.name} image={product.media.source}></CardMedia>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>{product.name}</Typography>
                    <Typography variant="h5">{product.price.formatted_with_symbol}</Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2" color="textSecondary" />
            </CardContent>
            {onAddCart && <CardActions disableSpacing className={classes.cardActions}>
                <Link style={{textDecoration: 'none'}} to={'/productDetail/'+product.id}><Button variant="outlined">Details</Button></Link>

		        <Button color="primary" onClick={() => onAddCart(product.id, 1)}>Add To Cart</Button>
                <IconButton aria-label="Add To Cart" onClick={() => onAddCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>}
        </Card>
    );
};

export default Product;
