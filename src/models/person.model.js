const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

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
    },

    username: {
        type:String,
        required: [true,'Username is required']
    },

    password: {
        type:String,
        required: [true,'Password is required']
    }
});

// pre('save', ...) middleware is triggered before the save operation on a Mongoose model instance.
personSchema.pre('save',async function(){
    const person=this;
    if(!person.isModified('password')) return; // if the password field has been modified or is new, then only hash it
    try {
        const salt=await bcrypt.genSalt(10); // generating a salt: random string of characters
        const hashPass=await bcrypt.hash(person.password,salt); // Hash the password with the salt
        person.password=hashPass; // // replace the plain password with the hashed one
        return;
    } catch (error) {
        return error;
    }
}); 

// Creating the person model
const Person=mongoose.model('Person',personSchema); 
/*
The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name
*/


module.exports=Person;