import { translationModel } from '../../src/components/translation/translationModel'
import { sentenceModel } from '../../src/components/sentences/sentenceModel'
import authMiddleware from '../../src/common/middlewares/authMiddleware'
import translationRouter from '../../src/components/translation/router'
import { errorService } from '../../src/common/services/errorService'
import sentenceRouter from '../../src/components/sentences/router'
import express, { Request, Response, NextFunction } from 'express'
import { mockConfig } from '../mock/config'
import { mockAxios } from '../mock/axios'
import { mockDb } from '../mock/firebase'

const { handle } = errorService()

const app = express()

app.use(express.json())

// translation api
const trModel = translationModel(mockAxios, { key: mockConfig.deepl.key, url: mockConfig.deepl.url })
app.use('/api/v1/translate', authMiddleware('patata'), translationRouter(trModel))
// sentences api
const sModel = sentenceModel(mockDb as any)
app.use('/api/v1/sentences', authMiddleware(mockConfig.secret), sentenceRouter(sModel))
// Api error handling
app.use('/api/v1', (err: Error, _req: Request, res: Response, _next: NextFunction) => handle(err, res))

export default app