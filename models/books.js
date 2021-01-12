const mongoose = require('mongoose');
const Author = require('./author');

//create the schema for books (the structure)

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    author: Author.schema,
    genre:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

module.exports = new mongoose.model('Book', bookSchema);