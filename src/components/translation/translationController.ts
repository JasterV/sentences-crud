import { NextFunction, Request, Response } from "express";
import { RequestError } from "../../common/errors";
import { TranslationModel } from "./interfaces/translationModel";

export const translationController = (model: TranslationModel) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { sentence } = req.body
        try {
            const result = await model.translate(sentence)
            return res.status(200).json({
                success: true,
                data: result
            })
        } catch {
            return next(new RequestError('Deepl Translation Error'))
        }
    }
}