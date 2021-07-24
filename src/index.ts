import app from './server'
import config from './config'

const port = config.port

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})
