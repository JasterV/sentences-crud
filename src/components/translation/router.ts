import { bodySchemaValidator } from '../../common/middlewares/bodySchemaValidator'
import { translationController } from './translationController'
import validator from '../../common/services/validatorService'
import { translateBody } from './schemas'
import { Router } from 'express'
import { TranslationModel } from './interfaces/translationModel'

const router = (model: TranslationModel) => {
    const router = Router()
    router.post('/', bodySchemaValidator(translateBody, validator), translationController(model));
    return router
}


export default router

