import React from 'react';
import {Grid, Typography, Button, Container} from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import useStyle from './style.js';
import {Link} from 'react-router-dom';

const Cart = ({cart, onUpdateCart, onRemoveFromCart, onEmptyCart}) => {
    const classes = useStyle();

    const EmptyCart = () => (
        <Typography variant="h3">Your cart is empty, try to <br/> 
            <Link to="/">Buy something</Link>
        !</Typography>
    );
    const FilledCart = () => (
        <>
            <div className={classes.toolbar}/>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=> (
                    <Grid item key={item.id} xs={12} sm={4}>
                       <CartItem item={item} onUpdateCart={onUpdateCart} onRemoveFromCart={onRemoveFromCart} onEmptyCart={onEmptyCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button 
                        onClick={() => onEmptyCart()} 
                        className={classes.emptyButton} 
                        variant="contained" 
                        type="button" 
                        size="large" 
                        color="secondary">
                        Empty Cart
                    </Button>
                    <Button 
                        component={Link} 
                        to="/checkout" 
                        className={classes.checkoutButton} 
                        variant="contained" 
                        type="button" 
                        size="large" 
                        color="primary">
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    );
    if(!cart.line_items)return "loadding ...";
    return (
        <Container>
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    );
};

export default Cart;