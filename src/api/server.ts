import express, { NextFunction, Request, Response } from 'express'
import authMiddleware from './middlewares/authMiddleware'
import { errorService } from '../services/errorService'
import config from '../config'
import router from './router'

const { handle } = errorService()

const app = express()
app.use(express.json())
// check auth header
router.use(authMiddleware(config.secret))
// sentences api
app.use('/api/v1/sentences', router)
// Error handling logic
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => handle(err, res))
process.on('uncaughtException', handle)

export default app