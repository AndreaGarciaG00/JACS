// models/collaboratorModel.js
const mongoose = require('mongoose');

const collaboratorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Se necesita el nombre del colaborador']
    },
    info: {
        type: String,
        required: [true, 'A collaborator must have information']
    },
    image: {
        type: String,
        required: [true, 'A collaborator must have an image URL']
    }
});

const Collaborator = mongoose.model('Collaborator', collaboratorSchema);

module.exports = Collaborator;
