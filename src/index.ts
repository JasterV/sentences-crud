import app from './api/server'
import config from './config'

const port = config.port

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})
