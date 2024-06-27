import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from '../../components/moduleToolbar';
import { useParams, useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    title: yup.string('Add a post title').min(4, 'Title should be at least 4 characters').required('Title is required'),
    date: yup.date().required('Date is required'),
    time: yup.string().required('Time is required'),
    description: yup.string().required('Description is required'),
});

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchEvent();
    }, []);

    const fetchEvent = async () => {
        try {
            const { data } = await axios.get(`/api/event/${id}`);
            setEventData(data.event);
        } catch (error) {
            console.error('Error fetching event:', error);
            toast.error('Failed to fetch event');
        }
    };

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue
    } = useFormik({
        initialValues: {
            title: '',
            date: '',
            time: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            await updateEvent(values);
            actions.resetForm();
        },
    });

    useEffect(() => {
        if (eventData) {
            setFieldValue('title', eventData.title);
            setFieldValue('date', eventData.date.substring(0, 10));
            setFieldValue('time', eventData.time);
            setFieldValue('description', eventData.description);
            setImage(eventData.image.url);
        }
    }, [eventData]);

    const updateEvent = async (formData) => {
        try {
            const response = await axios.put(`/api/event/update/${id}`, {
                ...formData,
                image: image,
            });
            if (response.data.success) {
                toast.success('Event updated successfully');
                navigate('/admin/event');
            }
        } catch (error) {
            console.error('Error updating event:', error);
            toast.error('Failed to update event');
        }
    };

    const handleImageDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Box sx={{ bgcolor: 'white', padding: '20px 200px' }}>
            <Typography variant="h5" sx={{ pb: 4 }}>
                Edit Event
            </Typography>
            {eventData && (
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="title"
                        label="Event Title"
                        name="title"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Event Title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                    />

                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="date"
                        label="Event Date"
                        type="date"
                        name="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.date && Boolean(errors.date)}
                        helperText={touched.date && errors.date}
                    />

                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="time"
                        label="Event Time"
                        type="time"
                        name="time"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={values.time}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.time && Boolean(errors.time)}
                        helperText={touched.time && errors.time}
                    />

                    <Box sx={{ mb: 3 }}>
                        <ReactQuill
                            theme="snow"
                            placeholder={'Write the event description...'}
                            modules={modules}
                            value={values.description}
                            onChange={(e) => setFieldValue('description', e)}
                        />
                        <Box component="span" sx={{ color: '#d32f2f', fontSize: '12px', pl: 2 }}>
                            {touched.description && errors.description}
                        </Box>
                    </Box>

                    <Box border="2px dashed blue" sx={{ p: 1, mb: 3 }}>
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) => handleImageDrop(acceptedFiles)}
                        >
                            {({ getRootProps, getInputProps, isDragActive }) => (
                                <Box
                                    {...getRootProps()}
                                    p="1rem"
                                    sx={{
                                        "&:hover": { cursor: "pointer" },
                                        bgcolor: isDragActive ? "#cceffc" : "#fafafa",
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <>
                                            <p style={{ textAlign: "center" }}>
                                                <CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} />
                                            </p>
                                            <p style={{ textAlign: "center", fontSize: "12px" }}>Drop here!</p>
                                        </>
                                    ) : image ? (
                                        <img
                                            src={image}
                                            alt="Event"
                                            style={{ maxWidth: "100%", maxHeight: "200px" }}
                                        />
                                    ) : (
                                        <>
                                            <p style={{ textAlign: "center" }}>
                                                <CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} />
                                            </p>
                                            <p style={{ textAlign: "center", fontSize: "12px" }}>
                                                Drag and drop image here or click to choose
                                            </p>
                                        </>
                                    )}
                                </Box>
                            )}
                        </Dropzone>
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
                    >
                        Update Event
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default EditEvent;
