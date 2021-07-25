import { bodySchemaValidator } from '../../common/middlewares/bodySchemaValidator'
import { querySchemaValidator } from '../../common/middlewares/querySchemaValidator'
import { createSchema, listSchema, updateSchema } from './schemas'
import validator from '../../common/services/validatorService'
import { Router } from 'express'
import {
    createSentenceController,
    updateSentenceController,
    deleteSentenceController,
    listSentencesController,
    getSentenceController
} from './controllers'
import { CrudModel } from './interfaces/crudModel'
import { Sentence } from './interfaces/sentence'

const router = (model: CrudModel<Sentence>) => {
    const router = Router()
    router.get('/:id', getSentenceController(model))
    router.get('/', querySchemaValidator(listSchema, validator), listSentencesController(model))
    router.post('/', bodySchemaValidator(createSchema, validator), createSentenceController(model))
    router.put('/:id', bodySchemaValidator(updateSchema, validator), updateSentenceController(model))
    router.delete('/:id', deleteSentenceController(model))
    return router
}

export default router

