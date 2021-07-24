import dotenv from 'dotenv'

dotenv.config()

const {
    NODE_ENV = "development",
    PORT = 8080,
    API_SECRET,
    DEEPL_KEY,
    DEEPL_URL
} = process.env;

if(!API_SECRET) throw new Error('API_SECRET required but not found')
if(!DEEPL_KEY) throw new Error('DEEPL_KEY required but not found')
if(!DEEPL_URL) throw new Error('DEEPL_URL required but not found')

const config = {
    env: NODE_ENV,
    port: PORT,
    secret: API_SECRET,
    deepl: {
        key: DEEPL_KEY,
        url: DEEPL_URL
    }
};

export default config;