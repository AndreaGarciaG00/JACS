import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { io } from 'socket.io-client';
import EventCard from '../components/EventCard'; // Importa el componente de tarjeta de evento
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const socket = io('/', {
    reconnection: true
});

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('title');

    const loadEvents = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/event/all');
            setEvents(data.events);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        moment(event.date).format('YYYY-MM-DD').toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedEvents = filteredEvents.sort((a, b) => {
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortBy === 'date') {
            return moment(a.date).valueOf() - moment(b.date).valueOf();
        }
        return 0;
    });

    return (
        <>
            <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
                <Navbar />
                <Container sx={{ pt: 5, pb: 5, minHeight: '83vh' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Event Management
                        </Typography>
                        <Paper sx={{ p: 2, mb: 3 }}>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Aquí puedes ver y gestionar los eventos recientes.
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <TextField
                                    label="Buscar"
                                    variant="outlined"
                                    fullWidth
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    sx={{ mr: 2 }}
                                />
                                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                                    <InputLabel>Ordenar por</InputLabel>
                                    <Select
                                        value={sortBy}
                                        onChange={handleSortByChange}
                                        label="Ordenar por"
                                    >
                                        <MenuItem value="title">Título</MenuItem>
                                        <MenuItem value="date">Fecha</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Grid container spacing={2}>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    sortedEvents.map((event, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <EventCard
                                                id={event._id}
                                                title={event.title}
                                                date={moment(event.date).format('YYYY-MM-DD')}
                                                description={event.description}
                                                image={event.image ? event.image.url : ''}
                                            />
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                        </Paper>
                    </Box>
                </Container>
                <Footer />
            </Box>
        </>
    );
};

export default EventPage;
