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

//GET: retrieve all books in DB
router.get('/', (req, res) =>{
    Book.find()
        .then(books => res.send(books))
        .catch(err => {
            res.status(500).send(err.message);
        });
});

//GET: retrieve book with specific id
router.get('/:id', async(req, res) =>{
    const book = await Book.findById(req.params.id);
    if(!book) res.status(404).send('Book not found');
    res.send(book);
});

//UPDATE BOOK BY ID
router.put('/:id', async(req, res) =>{
    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.bookName,
            author:{
                name: req.body.authorName,
                age: req.body.authorAge
            },
            genre: req.body.genre
        },
        {new:true}
    );
    if(!updatedBook) res.status(404).send('Book not found for update');
    res.send(updatedBook);
});

//DELETE BOOK BY ID
router.delete('/:id', async(req, res) =>{
    const deletedBook = await Book.findByIdAndRemove(req.params.id);
    if(!deletedBook) res.status(404).send('Book cannot be found for deletion');
    res.send(deletedBook);
});


module.exports = router;