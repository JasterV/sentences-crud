import { Router } from 'express'
import config from 'src/config'
import authMiddleware from './middlewares/authMiddleware'

const router = Router()

router.use(authMiddleware(config.secret))

router.get('/list', (req, res) => {
    console.log('hi')
})

router.get('/:id', (req, res) => {
    console.log('hi')
})

router.post('/', (req, res) => {
    console.log('hi')
})

router.put('/:id', (req, res) => {
    console.log('hi')
})

router.delete('/:id', (req, res) => {
    console.log('hi')
})

export default router

