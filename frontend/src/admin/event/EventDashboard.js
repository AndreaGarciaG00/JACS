import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

const EventDashboard = () => {
    const [events, setEvents] = useState([]);

    const displayEvents = async () => {
        try {
            const { data } = await axios.get('/api/event/all');
            setEvents(data.events);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch events');
        }
    };

    useEffect(() => {
        displayEvents();
    }, []);

    // Delete event by ID
    const deleteEventById = async (e, id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const { data } = await axios.delete(`/api/event/delete/${id}`);
                if (data.success === true) {
                    toast.success(data.message);
                    displayEvents();
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete event');
            }
        }
    };

    const columns = [
        {
            field: '_id',
            headerName: 'Event ID',
            width: 150,
            editable: true,
        },
        {
            field: 'title',
            headerName: 'Event Title',
            width: 200,
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            renderCell: (params) => moment(params.value).format('YYYY-MM-DD'),
        },
        {
            field: 'time',
            headerName: 'Time',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
        },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => <img width="40%" src={params.value.url} alt="Event" />,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 200,
            renderCell: (params) => moment(params.value).format('YYYY-MM-DD HH:MM:SS'),
        },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '170px' }}>
                    <Link to={`/admin/event/edit/${params.row._id}`}>
                        <IconButton aria-label="edit">
                            <EditIcon sx={{ color: '#1976d2' }} />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="delete" onClick={(e) => deleteEventById(e, params.row._id)}>
                        <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: 'black', pb: 3 }}>
                Event Management
            </Typography>
            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to="/admin/event/create">
                        Create Event
                    </Link>
                </Button>
            </Box>
            <Paper sx={{ bgcolor: 'white' }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{
                            '& .MuiTablePagination-displayedRows': {
                                color: 'black',
                            },
                            color: 'black',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: 'white',
                            },
                        }}
                        rows={events}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default EventDashboard;
