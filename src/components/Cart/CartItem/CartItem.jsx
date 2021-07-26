import React from 'react';
import useStyle from './style.js';
import {Card, CardMedia, CardContent, CardActions, Typography, Button} from '@material-ui/core';

const CartItem = ({item, onUpdateCart, onRemoveFromCart}) => {
    const classes = useStyle();

    return (
        <Card>
            <CardMedia className={classes.media} title={item.name} image={item.media.source}></CardMedia>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>{item.name}</Typography>
                    <Typography variant="h5">{item.price.formatted_with_symbol}</Typography>
                </div>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <div  className={classes.buttons}>
                    <Button onClick={()=> onUpdateCart(item.id, item.quantity-1)} type="button" size="small">-</Button>
                    <Typography variant="body2">{item.quantity}</Typography>
                    <Button onClick={()=> onUpdateCart(item.id, item.quantity+1)} type="button" size="small">+</Button>
                </div>
                <Button onClick={() => onRemoveFromCart(item.id)} variant="contained" type="button" color="secondary">Remove</Button>
            </CardActions>
        </Card>
    );
};

export default CartItem;