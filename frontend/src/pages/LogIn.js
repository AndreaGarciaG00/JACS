import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSignInAction } from '../redux/actions/userAction';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, userInfo } = useSelector(state => state.signIn);

    useEffect(() => {
        if (isAuthenticated) {
            if (userInfo.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        }
    }, [isAuthenticated]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(userSignInAction(values));
            actions.resetForm();
        }
    });

    return (
        <>
            <Navbar />
            <Box sx={{ height: '100vh', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: "primary.white" }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Contenedor cuadrado para la imagen */}
                        <Box sx={{ width: 200, height: 200, bgcolor: "primary.main", mb: 3, borderRadius: '8px', overflow: 'hidden' }}>
                            <img src="https://scontent-qro1-1.xx.fbcdn.net/v/t39.30808-6/301590191_5317909621619724_4696906082479383626_n.png?stp=dst-png_p480x480&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=NC9gE-FVxK4Q7kNvgEeiKyM&_nc_ht=scontent-qro1-1.xx&oh=00_AYDs-NFp8_PDAR-PDU2dMpfb-tHkpsMja8C5IWx3wOACPw&oe=667862C2" alt="lock icon" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Box component="form" onSubmit={formik.handleSubmit} className='form_style border-style'>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary',
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="email"
                                    label="E-mail"
                                    name='email'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="E-mail"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <Button fullWidth variant="contained" type='submit'>Log In</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </>
    );
};

export default LogIn;
