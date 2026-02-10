const mongoose=require('mongoose');
const { MONGO_ATLAS_URL, NODE_ENV } = require('./serverConfig');

async function connectToDB() {
    try {
        if(NODE_ENV=='development'){
            await mongoose.connect(MONGO_ATLAS_URL);
        }
    } catch (error) {
        console.log('Unable to connect to DB server',error);
    }
}

module.exports=connectToDB;