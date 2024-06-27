import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    titulo: yup.string().required('Podcast title is required').min(4, 'Title should be at least 4 characters'),
    descripcion: yup.string().required('Description is required').min(10, 'Description should be at least 10 characters'),
    url: yup.string().required('URL is required').url('Invalid URL format'),
});

const EditPodcast = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        titulo: '',
        descripcion: '',
        url: '',
    });

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setValues,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            try {
                const { data } = await axios.put(`/api/podcast/update/${id}`, values);
                if (data.success) {
                    toast.success('Podcast updated successfully');
                    navigate('/admin/podcast/dashboard');
                }
            } catch (error) {
                console.error('Error updating podcast:', error);
                toast.error('Failed to update podcast');
            }
        },
    });

    const fetchPodcastById = async () => {
        try {
            const { data } = await axios.get(`/api/podcast/${id}`);
            setInitialValues({
                titulo: data.podcast.titulo,
                descripcion: data.podcast.descripcion,
                url: data.podcast.url,
            });
        } catch (error) {
            console.error('Error fetching podcast:', error);
            toast.error('Failed to fetch podcast');
        }
    };

    useEffect(() => {
        fetchPodcastById();
    }, []);

    return (
        <Container sx={{ pt: 5, pb: 5 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Edit Podcast
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
                    Update Podcast
                </Button>
            </Box>
        </Container>
    );
};

export default EditPodcast;
