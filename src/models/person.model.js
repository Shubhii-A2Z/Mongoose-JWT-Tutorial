const mongoose=require('mongoose');

// Defining the person schema
const personSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name cannot be empty']
    },

    gender: {
        type: String,
        enum: ['Male','Female'],
        required: [true,'Gender cannot be empty']
    },

    mobile: {
        type: String,
        required: [true,'Mobile cannot be empty'],
        unique: true
    },

    email: {
        type: String,
        unique: true
    } 
});

// Creating the person model
const Person=mongoose.model('Person',personSchema); 
/*
The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name
*/


module.exports=Person;