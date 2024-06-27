import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';

const PodcastDashboard = () => {
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        fetchPodcasts();
    }, []);

    const fetchPodcasts = async () => {
        try {
            const response = await axios.get('/api/podcasts');
            setPodcasts(response.data.podcasts);
        } catch (error) {
            console.error('Error fetching podcasts:', error);
        }
    };

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Podcast Dashboard
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Button
                    component={Link}
                    to="/admin/podcast/create"
                    variant="contained"
                    color="primary"
                >
                    Create New Podcast
                </Button>
            </Box>
            <Grid container spacing={3}>
                {podcasts.map((podcast) => (
                    <Grid item key={podcast._id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {podcast.titulo}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {podcast.descripcion}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    component={Link}
                                    to={`/admin/podcast/edit/${podcast._id}`}
                                    size="small"
                                    color="primary"
                                >
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default PodcastDashboard;
