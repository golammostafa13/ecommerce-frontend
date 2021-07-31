import React, {useState, useEffect} from 'react';
import {Grid, Typography, InputLabel, Select, MenuItem, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import FormInput from './FormInput';
import {useForm, FormProvider} from 'react-hook-form';
import {commerce} from '../../lib/commerce.js';

const AdressForm = ({checkoutToken, next}) => {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));

    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));

    const options = shippingOptions.map(sO => ({id: sO.id, label: `${sO.description} - ${sO.price.formatted_with_symbol}`}));
    useEffect(() => {
        const fetchCountries = async (checkoutToken) => {
            const {countries} = await commerce.services.localeListShippingCountries(checkoutToken.id);
            setShippingCountries(countries);
            // setShippingCountry(Object.keys(coutries)[0]);
            setShippingCountry(Object.keys(countries)[0]);
        };
        fetchCountries(checkoutToken);
    }, []);

    useEffect(() => {
        const fetchSubdivisions = async (countryCode) => {
            const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
            // console.log(subdivisions);
            setShippingSubdivisions(subdivisions);
            setShippingSubdivision(Object.keys(subdivisions)[0]);
        }
        if(shippingCountry)fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        const fetchOptions = async (checkoutTokenId, country, region=null) =>{
            const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
            setShippingOptions(options);
            setShippingOption(options[0].id);
        }
        if(shippingSubdivision)fetchOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Adress</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                    <Grid container spacing={3}>
                            <FormInput required name="firstName" label="First Name" />
                            <FormInput required name="lastName" label="Last Name" />
                            <FormInput required name="email" label="Email" />
                            <FormInput required name="address" label="Address" />
                            <FormInput required name="city" label="City" />
                            <FormInput required name="zip" label="ZIP / POSTAL code" />
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Countries</InputLabel>
                                <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                    {
                                        countries.map((country =>(
                                            <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                                        )))
                                    }
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Subdivisions</InputLabel>
                                <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                    {
                                        subdivisions.map((subdivision =>(
                                            <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                                        )))
                                    }
                                </Select>
                            </Grid>
                             <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Options</InputLabel>
                                <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                    {
                                        options.map((option =>(
                                            <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                                        )))
                                    }
                                </Select>
                            </Grid>
                    </Grid>
                    <br/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button component={Link} to="/cart" variant="outlined">Back To Cart</Button>
                        <Button type='submit' variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default AdressForm;
