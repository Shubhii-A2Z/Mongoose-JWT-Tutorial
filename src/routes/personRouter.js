const express=require('express');
const { addPerson, getPersons } = require('../controllers/personController');

const personRouter=express.Router();

personRouter.post('/signup',addPerson);

personRouter.get('/',getPersons);

module.exports=personRouter;