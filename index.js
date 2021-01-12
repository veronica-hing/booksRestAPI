const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const booksRoute = require('./routes/books');

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json()); //tells server we are using json objects
app.use(express.urlencoded({extended:true})); //objects can have arrays etc

//routes
app.use('/api/books', booksRoute);

//connecting to mongodb atlas
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('connected to mongodb atlas');
}).catch(error =>{
    console.log('Something wrong happened', error);
});

//starting the server
app.listen(PORT, () =>{
    console.log(`Server started at ${PORT}`);
});