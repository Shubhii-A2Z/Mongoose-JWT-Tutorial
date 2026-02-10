const { StatusCodes } = require("http-status-codes");

const PersonRepository = require("../repositories/person.repository");
const { generateToken } = require("../utils/jwt");

async function addPerson(req,resp){
    try {
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

        // Finding user by name
        const user=await PersonRepository.getPerson(name);

        // Generate token
        const payload={
            id: user.id,
            name: user.name
        }
        const token=generateToken(payload);

        return resp.json({
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