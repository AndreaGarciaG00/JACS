// EventCard.js
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import moment from 'moment';

const EventCard = ({ id, title, date, time, description, imageUrl, onDelete }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Date:</strong> {moment(date).format('MMMM DD, YYYY')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Time:</strong> {time}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Edit
                </Button>
                <Button size="small" color="error" onClick={() => onDelete(id)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default EventCard;
