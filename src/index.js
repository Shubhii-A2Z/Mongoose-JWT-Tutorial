const express=require('express');
const bodyParser=require('body-parser');

const { PORT } = require('./config/serverConfig');
const connectToDB = require('./config/dbConfig');
const PersonRepository = require('./repositories/person.repository');
const { StatusCodes } = require('http-status-codes');

const app=express();

app.use(bodyParser.json());

app.post('/person',async (req,resp)=>{
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
});

app.get('/person',async (req,resp)=>{
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
});

app.listen(PORT,async ()=>{
    console.log(`Server started at port: ${PORT}`);
    await connectToDB();
    console.log('Connected to DB');
});