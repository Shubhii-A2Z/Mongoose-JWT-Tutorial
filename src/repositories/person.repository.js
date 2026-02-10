const Person = require("../models/person.model");

class PersonRepository{

    async createPerson(personData){
        try {
            // Creating a new person using the mongoose model
            const newPerson=new Person(personData);

            // Saving the new person to database
            const response=await newPerson.save();

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllData(){
        try {
            const data=await Person.find({});
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getPerson(name){
        try {
            // Finding user by name
            const user=await Person.findOne({name: name});
            
            // If user doesnt exist
            if(!user) return console.log('Person not found') ;
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports=new PersonRepository();