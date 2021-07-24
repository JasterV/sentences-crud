import express, { NextFunction, Request, Response } from 'express'
import authMiddleware from './common/middlewares/authMiddleware'
import { errorService } from './common/services/errorService'
import sentenceRouter from './components/sentences/router'
import translationRouter from './components/translation/router'
import viewsRouter from './components/view/router'
import config from './config'

const { handle } = errorService()

const app = express()

app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/src/views')
app.use(express.json())

app.use('/public', viewsRouter)
// translation api
app.use('/api/v1/translate', authMiddleware(config.secret), translationRouter)
// sentences api
app.use('/api/v1/sentences', authMiddleware(config.secret), sentenceRouter)
// Error handling logic
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => handle(err, res))
process.on('uncaughtException', handle)

export default app