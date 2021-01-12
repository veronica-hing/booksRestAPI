const express = require('express');
const router = express.Router();
const Book = require('../models/books');

//POST: create new book
router.post('/', (req,res) =>{
    const book = new Book({
        name: req.body.bookName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge
        },
        genre: req.body.genre
    });

    book.save()
        .then( 
            book =>{
                res.send(book);
            })
        .catch(
            error =>{
                res.status(500).send('Book was not stored in DB');
            });
});

module.exports = router;