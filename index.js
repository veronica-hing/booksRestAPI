const express = require('express');
const mongoose = require('mongoose');
const app = express();
const winston = require('winston');
require('dotenv').config();
const booksRoute = require('./routes/books');

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json()); //tells server we are using json objects
app.use(express.urlencoded({extended:true})); //objects can have arrays etc

//logger to log errors

const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({
          format:winston.format.combine(
              winston.format.colorize({all: true})
          )
      }),
      new winston.transports.File({ filename: 'error.log', level:'error' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
      ]
  });

//routes
app.use('/api/books', booksRoute);

//connecting to mongodb atlas
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(()=>{
        logger.info('connected to mongodb atlas');
    })
    .catch(error =>{
    logger.error(error);
    });

//starting the server
app.listen(PORT, () =>{
    logger.info(`Server started at ${PORT}`);
});