const express = require('express');
const router = express.Router();
const {Book, validateBook} = require('../models/books');

//POST: create new book
router.post('/', async (req,res) =>{
    const message = await validateBook(req.body);
    if(message.message) return res.status(400).send(message.message);

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