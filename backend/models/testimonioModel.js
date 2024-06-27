// models/testimonialModel.js
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    testimonial: {
        type: String,
        required: [true, 'Contenido del testimonio']
    },
    name: {
        type: String,
        required: [true, 'Nombre del testimonio']
    },
    story: {
        type: String,
        required: [true, 'Historia del testimonio']
    },
    image: {
        type: String,
        default: ''
    }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
