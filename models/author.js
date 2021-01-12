const mongoose = require('mongoose');

//author schema
const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:50,
    },
    age:{
        type: Number,
        min: 3,
        max: 100
    }
});

module.exports = new mongoose.model('Author', authorSchema);