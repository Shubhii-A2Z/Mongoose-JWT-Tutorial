const { StatusCodes } = require("http-status-codes");

const PersonRepository = require("../repositories/person.repository");

async function addPerson(req,resp){
    try {
        const personData=req.body; // Assuming the req body contains person data
        const response=await PersonRepository.createPerson(personData);
        return resp.status(StatusCodes.CREATED).json({
            mssg: 'Data Entered Successfully',
            data: response
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

module.exports={
    getPersons,
    addPerson
};