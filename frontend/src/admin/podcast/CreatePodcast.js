import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
    titulo: yup.string().required('Podcast title is required').min(4, 'Title should be at least 4 characters'),
    descripcion: yup.string().required('Description is required').min(10, 'Description should be at least 10 characters'),
    url: yup.string().required('URL is required').url('Invalid URL format'),
});

const CreatePodcast = () => {
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            titulo: '',
            descripcion: '',
            url: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            try {
                const { data } = await axios.post('/api/podcast/create', values);
                if (data.success) {
                    toast.success('Podcast created successfully');
                    actions.resetForm();
                }
            } catch (error) {
                console.error('Error creating podcast:', error);
                toast.error('Failed to create podcast');
            }
        },
    });

    return (
        <Container sx={{ pt: 5, pb: 5 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Create Podcast
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    fullWidth
                    id="titulo"
                    label="Podcast Title"
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.titulo && Boolean(errors.titulo)}
                    helperText={touched.titulo && errors.titulo}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="descripcion"
                    label="Description"
                    name="descripcion"
                    value={values.descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.descripcion && Boolean(errors.descripcion)}
                    helperText={touched.descripcion && errors.descripcion}
                    sx={{ mt: 3 }}
                />
                <TextField
                    fullWidth
                    id="url"
                    label="Podcast URL"
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.url && Boolean(errors.url)}
                    helperText={touched.url && errors.url}
                    sx={{ mt: 3 }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                    Create Podcast
                </Button>
            </Box>
        </Container>
    );
};

export default CreatePodcast;
