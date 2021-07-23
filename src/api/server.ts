import express from 'express'

const app = express()

app.use(express.json())

app.get('/dummy/hi', (_req, res) => {
    res.json({success: true, data: 'Hello, World'})
})

export default app