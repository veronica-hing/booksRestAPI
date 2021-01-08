const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
//connecting to mongodb atlas
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('connected to mongodb atlas');
}).catch(error =>{
    console.log('Something wrong happened', error);
});

app.listen(PORT, () =>{
    console.log(`Server started at ${PORT}`);
});