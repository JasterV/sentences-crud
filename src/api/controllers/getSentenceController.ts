import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../../errors'
import { CrudModel } from '../../interfaces/crudModel'
import { Sentence } from '../../interfaces/sentence'

export const getSentenceController = (model: CrudModel<Sentence>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            const sentence: Sentence = await model.getById(id)
            return res.status(201).json({
                success: true,
                data: sentence
            })
        } catch (err) {
            if(err instanceof NotFoundError) {
                return res.status(404).json({
                    success: false,
                    msg: err.message
                })
            }
            return next(err)
        }
    }
}