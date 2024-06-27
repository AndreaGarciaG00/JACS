import React from 'react';
import { Container, Box, Typography, Grid, Button, Card, CardMedia, CardContent } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
    // URL de la imagen que se usará para todas las secciones
    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsSbsdOMqHNJbb-MgBEDdy74g0IM5geI8SlA&s';

    // Configuración de React Slick para el slider de mensajes
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Mostrar 3 imágenes a la vez
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // Cambiar cada 2 segundos
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    dots: false
                }
            }
        ]
    };

    return (
        <>
            <Navbar />
            <Container>
                {/* Sección de Equipo de Trabajo */}
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        Nuestro Equipo
                    </Typography>
                    {/* Imagen de equipo de trabajo: Recomendado ajustar a la anchura máxima de 1200px */}
                    <img src={imageUrl} alt="Equipo de trabajo" style={{ width: '100%', maxWidth: 1200, margin: 'auto', display: 'block' }} />
                </Box>

                {/* Sección de Ruleta con Mensajes */}
                <Box sx={{ my: 4 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Mensajes Inspiradores
                    </Typography>
                    <Slider {...settings}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index}>
                                {/* Imágenes del slider de mensajes: Recomendado ajustar a la anchura completa */}
                                <img src={imageUrl} alt={`Mensaje ${index + 1}`} style={{ width: '100%' }} />
                            </div>
                        ))}
                    </Slider>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                            Equipo de trabajo
                        </Button>
                        <Button variant="contained" color="secondary">
                            Gustas ayudar?
                        </Button>
                    </Box>
                </Box>

                {/* Sección de Tabla con Imágenes y Texto */}
                <Box sx={{ my: 4 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Proyectos Destacados
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={imageUrl} // Imagen del proyecto 1
                                    alt="Proyecto 1"
                                />
                                <CardContent>
                                    <Typography variant="body1" component="div">
                                        Descripción del Proyecto 1
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CardContent>
                                <Typography variant="body1" component="div">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit.
                                    Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CardContent>
                                <Typography variant="body1" component="div">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit.
                                    Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={imageUrl} // Imagen del proyecto 2
                                    alt="Proyecto 2"
                                />
                                <CardContent>
                                    <Typography variant="body1" component="div">
                                        Descripción del Proyecto 2
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default Home;
