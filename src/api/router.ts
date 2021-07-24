import { Router } from 'express'
import {
    createSentenceController, 
    updateSentenceController, 
    deleteSentenceController, 
    listSentencesController, 
    getSentenceController 
} from './controllers'

const router = Router()

router.get('/list', listSentencesController())
router.get('/:id', getSentenceController())
router.post('/', createSentenceController())
router.put('/:id', updateSentenceController())
router.delete('/:id', deleteSentenceController())

export default router

