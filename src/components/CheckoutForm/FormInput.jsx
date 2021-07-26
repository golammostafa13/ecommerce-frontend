import React from 'react';
import {Grid, TextField} from '@material-ui/core';
import {Controller, useForm} from 'react-hook-form';

const FormInput = ({name, label, required}) => {
    const {control} = useForm();
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                control={control}
                name={name}
                render={({ field }) => <TextField fullWidth label={label} required />}
            />
        </Grid>
    );
};

export default FormInput;