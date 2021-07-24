import { Request, Response, NextFunction } from 'express'
import { CrudModel } from '../interfaces/crudModel'
import { Sentence } from '../interfaces/sentence'

export const createSentenceController = (model: CrudModel<Sentence>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { text, category } = req.body
        try {
            const id = await model.create({ text, category })
            return res.status(201).json({
                success: true,
                data: id
            })
        } catch (err) {
            return next(err)
        }
    }
}