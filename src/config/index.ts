import dotenv from 'dotenv'

dotenv.config()

const {
    NODE_ENV = "development",
    PORT = 8080,
    API_SECRET,
} = process.env;

if(!API_SECRET) throw new Error('API_SECRET required but not found')

const config = {
    env: NODE_ENV,
    port: PORT,
    secret: API_SECRET
};

export default config;