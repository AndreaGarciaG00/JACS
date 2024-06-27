// models/bookModel.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nombre del libro']
    },
    author: {
        type: String,
        required: [true, 'Autor del libro']
    },
    description: {
        type: String,
        required: [true, 'Descripcion del libro']
    },
    publicationYear: {
        type: Number,
        required: [true, 'Año de publicacion']
    },
    image: {
        type: String,
        required: [true, 'Imagen de libro']
    },
    link: {
        type: String,
        default: ''
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
