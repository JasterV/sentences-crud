import dotenv from 'dotenv'

dotenv.config()

const {
    NODE_ENV = "development",
    PORT = 8080,
} = process.env;

const config = {
    env: NODE_ENV,
    port: PORT
};

export default config;