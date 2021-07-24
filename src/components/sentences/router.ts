import { bodySchemaValidator } from '../../common/middlewares/bodySchemaValidator'
import { querySchemaValidator } from '../../common/middlewares/querySchemaValidator'
import { createSchema, listSchema, updateSchema } from './schemas'
import validator from '../../common/services/validatorService'
import { sentenceModel } from './sentenceModel'
import { Router } from 'express'
import {
    createSentenceController,
    updateSentenceController,
    deleteSentenceController,
    listSentencesController,
    getSentenceController
} from './controllers'
import db from '../../db'

const router = Router()
const model = sentenceModel(db)

router.get('/:id', getSentenceController(model))
router.get('/', querySchemaValidator(listSchema, validator), listSentencesController(model))
router.post('/', bodySchemaValidator(createSchema, validator), createSentenceController(model))
router.put('/:id', bodySchemaValidator(updateSchema, validator), updateSentenceController(model))
router.delete('/:id', deleteSentenceController(model))

export default router

