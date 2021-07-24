import { bodySchemaValidator } from '../../common/middlewares/bodySchemaValidator'
import { translationController } from './translationController'
import { translationModel } from './translationModel'
import validator from '../../common/services/validatorService'
import { translateBody } from './schemas'
import { Router } from 'express'
import config from '../../config'
import axios from 'axios'

const router = Router()
const model = translationModel(axios, { key: config.deepl.key, url: config.deepl.url })

router.post('/', bodySchemaValidator(translateBody, validator), translationController(model));

export default router

