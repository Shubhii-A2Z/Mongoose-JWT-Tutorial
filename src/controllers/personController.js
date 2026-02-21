const { StatusCodes } = require("http-status-codes");

const PersonRepository = require("../repositories/person.repository");
const { generateToken } = require("../utils/jwt");

async function addPerson(req,resp){
    try {
        if(!req.body.name){
            return resp.status(StatusCodes.BAD_REQUEST).json({
                err: 'Enter required fields'
            });
        }
        const personData=req.body; // Assuming the req body contains person data
        const response=await PersonRepository.createPerson(personData);

        const payload={
            id: response.id,
            name: response.name
        }
        const token=generateToken(payload);

        return resp.status(StatusCodes.CREATED).json({
            mssg: 'Data Entered Successfully',
            Response: response,
            Token: token
        });
    } catch (error) {
        if(error.code==11000){ // Mongoose error for duplicate key
            return resp.status(StatusCodes.BAD_REQUEST).json({
                err: 'Duplicate Email'
            });
        }
        return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            err: 'Internal Server Error'
        });
    }
}

async function getPersons(req,resp){
    try {
        const response=await PersonRepository.getAllData();
        return resp.status(StatusCodes.OK).json({
            data: response
        });
    } catch (error) {
        return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            err: 'Cannot find data'
        });
    }
}

async function loginPerson(req,resp){
    try {
        // Extracting name and email from req body
        const {name,email}=req.body;
        if(!name){
            return resp.status(StatusCodes.BAD_REQUEST).json({
                error: 'Please enter name'
            });
        }

        // Finding user by name
        const user=await PersonRepository.getPerson(name);
        if(!user){
            return resp.status(StatusCodes.UNAUTHORIZED).json({
                error: 'User not found'
            })
        }

        // Generate token
        const payload={
            id: user.id,
            name: user.name
        }
        const token=generateToken(payload);

        return resp.status(StatusCodes.ACCEPTED).json({
            Token: token
        });
    } catch (error) {
        return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            Error: error
        });
    }
}

module.exports={
    getPersons,
    addPerson,
    loginPerson
};