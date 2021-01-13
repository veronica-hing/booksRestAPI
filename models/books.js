const mongoose = require('mongoose');
const Author = require('./author');
const yup = require('yup');

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

const validateBook = (book) =>{
    const schema = yup.object().shape({
        bookName: yup.string().required().min(3, 'book name must be at least 3 characters').max(50, 'book name cannot exceed 50 characters'),
        authorName: yup.string().required().min(3).max(50),
        authorAge: yup.number().required().min(3).max(100),
        genre: yup.string().required().min(3).max(50)
    });

    return schema
        .validate(book)
        .then(book => book)
        .catch((error) => { 
            return {message: error.message} 
        });
}

module.exports.Book = new mongoose.model('Book', bookSchema);
module.exports.validateBook = validateBook;