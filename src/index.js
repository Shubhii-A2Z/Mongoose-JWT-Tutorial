const express=require('express');

const { PORT } = require('./config/serverConfig');
const connectToDB = require('./config/dbConfig');
const personRouter = require('./routes/personRouter');

const app=express();

app.use(express.json());

app.use('/person',personRouter);

app.listen(PORT,async ()=>{
    console.log(`Server started at port: ${PORT}`);
    await connectToDB();
    console.log('Connected to DB');
});