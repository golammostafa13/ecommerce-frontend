import React, {useState, useEffect} from 'react';
import useStyle from './style.js';
import {Paper, Typography, Stepper, Step, StepLabel} from '@material-ui/core';
import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';
import ConfirmationForm from '../ConfirmationForm';
import {commerce} from '../../../lib/commerce.js';

const Checkout = ({cart}) => {
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyle();
    const steps = ['Shipping Adress', 'Payment Details']
    const [checkoutToken, setCheckoutToken] = useState({});
    const [shippingData, setShippingData] = useState({});
    
    useEffect(() => {
        const fetchCheckoutToken = async () => {
            const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
            setCheckoutToken(token);
        }
        fetchCheckoutToken();
    }, [cart]);

    const nextStep = () => {
        setActiveStep(preState => preState + 1);
    }
    const backStep = () => {
        setActiveStep(preState => preState - 1);
    }
    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const Form = () =>(
        activeStep === 0 ? <AdressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm />
    )
    
    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {
                            steps.map(step => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))
                        }
                    </Stepper>
                    {activeStep === steps.length ? <ConfirmationForm /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    );
};

export default Checkout;