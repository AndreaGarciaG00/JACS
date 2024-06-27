// models/psychologistModel.js
const mongoose = require('mongoose');

const psychologistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nombre del psicologo']
    },
    vocation: {
        type: String,
        required: [true, 'Especialidad del psicologo']
    },
    info: {
        type: String,
        required: [true, 'Informacion del psicologo']
    },
    phone: {
        type: String,
        required: [true, 'Numero del psicologo']
    },
    address: {
        type: String,
        default: ''
    }
});

const Psychologist = mongoose.model('Psychologist', psychologistSchema);

module.exports = Psychologist;
