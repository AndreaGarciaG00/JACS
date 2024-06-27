const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'El título es requerido'],
        },
        date: {
            type: Date,
            required: [true, 'La fecha es requerida'],
        },
        time: {
            type: String,
            required: [true, 'La hora es requerida'],
        },
        description: {
            type: String,
            required: [true, 'La descripción es requerida'],
        },
        image: {
            url: String,
            public_id: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
