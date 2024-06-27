const express = require('express');
const router = express.Router();
const {
    createEvent,
    showEvents,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

// Rutas de eventos
router.post('/create', createEvent);
router.get('/events', showEvents);
router.put('/update/:id', updateEvent);
router.delete('/delete/:id', deleteEvent);

module.exports = router;
