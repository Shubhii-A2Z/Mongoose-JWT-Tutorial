const express=require('express');

const { addPerson, getPersons, loginPerson } = require('../controllers/personController');
const { jwtAuthMiddleware } = require('../middlewares/jwtAuth');

const personRouter=express.Router();

personRouter.post('/signup',addPerson);

personRouter.post('/login',loginPerson);

personRouter.get('/',jwtAuthMiddleware,getPersons);

module.exports=personRouter;