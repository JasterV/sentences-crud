import dotenv from 'dotenv'

dotenv.config()

const {
    NODE_ENV = "development",
    PORT = 8080,
    API_SECRET,
    DEEPL_KEY,
    DEEPL_URL,
    FB_CERT_TYPE,
    FB_CERT_PROJECT_ID,
    FB_CERT_PRIVATE_KEY_ID,
    FB_CERT_PRIVATE_KEY,
    FB_CERT_CLIENT_EMAIL,
    FB_CERT_CLIENT_ID,
    FB_CERT_AUTH_URI,
    FB_CERT_TOKEN_URI,
    FB_CERT_AUTH_PROVIDER_X509_CERT_URL,
    FB_CERT_CLIENT_X509_CERT_URL,
} = process.env;

if (!API_SECRET) throw new Error('API_SECRET required but not found')
if (!DEEPL_KEY) throw new Error('DEEPL_KEY required but not found')
if (!DEEPL_URL) throw new Error('DEEPL_URL required but not found')
if (!FB_CERT_TYPE) throw new Error('FB_CERT_TYPE required but not found')
if (!FB_CERT_PROJECT_ID) throw new Error('FB_CERT_PROJECT_ID required but not found')
if (!FB_CERT_PRIVATE_KEY_ID) throw new Error('FB_CERT_PRIVATE_KEY_ID required but not found')
if (!FB_CERT_PRIVATE_KEY) throw new Error('FB_CERT_PRIVATE_KEY required but not found')
if (!FB_CERT_CLIENT_EMAIL) throw new Error('FB_CERT_CLIENT_EMAIL required but not found')
if (!FB_CERT_CLIENT_ID) throw new Error('FB_CERT_CLIENT_ID required but not found')
if (!FB_CERT_AUTH_URI) throw new Error('FB_CERT_AUTH_URI required but not found')
if (!FB_CERT_TOKEN_URI) throw new Error('FB_CERT_TOKEN_URI required but not found')
if (!FB_CERT_AUTH_PROVIDER_X509_CERT_URL) throw new Error('FB_CERT_AUTH_PROVIDER_X509_CERT_URL required but not found')
if (!FB_CERT_CLIENT_X509_CERT_URL) throw new Error('FB_CERT_CLIENT_X509_CERT_URL required but not found')

const config = {
    env: NODE_ENV,
    port: PORT,
    secret: API_SECRET,
    deepl: {
        key: DEEPL_KEY,
        url: DEEPL_URL
    },
    firebase: {
        credentials: {
            type: FB_CERT_TYPE,
            project_id: FB_CERT_PROJECT_ID,
            private_key_id: FB_CERT_PRIVATE_KEY_ID,
            private_key: FB_CERT_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: FB_CERT_CLIENT_EMAIL,
            client_id: FB_CERT_CLIENT_ID,
            auth_uri: FB_CERT_AUTH_URI,
            token_uri: FB_CERT_TOKEN_URI,
            auth_provider_x509_cert_url: FB_CERT_AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: FB_CERT_CLIENT_X509_CERT_URL,
        }
    }
};

export default config;