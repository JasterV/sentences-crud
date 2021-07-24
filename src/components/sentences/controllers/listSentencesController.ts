import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../../../common/errors'
import { CrudModel } from '../interfaces/crudModel'
import { Sentence } from '../interfaces/sentence'

export const listSentencesController = (model: CrudModel<Sentence>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { orderBy, order, lastId } = req.query
        try {
            const sentences: Sentence[] = await model.list({ orderBy, order, last: lastId })
            return res.status(201).json({
                success: true,
                data: sentences
            })
        } catch (err) {
            if (err instanceof NotFoundError) {
                return res.status(404).json({
                    success: false,
                    msg: err.message
                })
            }
            return next(err)
        }
    }
}