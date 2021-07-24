import express from 'express'
import router from './router'

const app = express()

app.use(express.json())

app.use('/api/v1/sentences', router)

export default app