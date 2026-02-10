process.loadEnvFile();

module.exports={
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET
}