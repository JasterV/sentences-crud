import { NextFunction, Request, Response, Router } from "express"
import { Sentence } from "../sentences/interfaces/sentence"
import { sentenceModel } from "../sentences/sentenceModel"
import { NotFoundError } from "../../common/errors"
import db from "../../db"

const router = Router()

const model = sentenceModel(db)

router.get('/sentences', async (req, res) => {
    const { orderBy, order, lastId } = req.query
    const sentences: Sentence[] = await model.list({ orderBy, order, last: lastId })
    return res.render('list', { sentences, orderBy: orderBy ?? null, order })
})



router.get('/sentence/:id/delete', async (req, res) => {
    const { id } = req.params
    await model.del(id)
    return res.redirect('/public/sentences')
})

router.get('/sentence/:id/edit', async (req, res) => {
    const { id } = req.params
    const sentence: Sentence = await model.getById(id)
    return res.render('form_sentence', { sentence })
})

router.get('/sentence/:id', async (req, res) => {
    const { id } = req.params
    const sentence: Sentence = await model.getById(id)
    return res.render('sentence', { sentence })
})

router.get('/sentence', (_req, res) => res.render('form_sentence', { sentence: {} }))

router.post('/sentence/:id/edit', async (req, res) => {
    const { id } = req.params
    const { text, category } = req.body
    const sentence: Sentence = await model.update(id, { text, category })
    return res.render('sentence', { sentence })
})

router.post('/sentence', async (req, res) => {
    const { text, category } = req.body
    const id = await model.create({ text, category })
    return res.redirect('/public/sentence/' + id)
})

// EJS views
router.get('/', (_req, res) => res.render('index'))

router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof NotFoundError) {
        return res.render('error', { error: { code: 404, title: 'NOT FOUND' } })
    }
    return res.render('error', { error: { code: 500, title: 'SERVER ERROR' } });
})

router.use((_req, res) => res.render('error', { error: { code: 404, title: 'NOT FOUND' } }))

export default router