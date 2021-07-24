import express, { NextFunction, Request, Response } from 'express'
import authMiddleware from './common/middlewares/authMiddleware'
import { errorService } from './common/services/errorService'
import sentenceRouter from './components/sentences/router'
import translationRouter from './components/translation/router'
import config from './config'

const { handle } = errorService()

const app = express()
app.use(express.json())
// translation api
app.use('/api/v1/translate', translationRouter)
// sentences api
app.use('/api/v1/sentences', authMiddleware(config.secret), sentenceRouter)
// Error handling logic
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => handle(err, res))
process.on('uncaughtException', handle)

export default app