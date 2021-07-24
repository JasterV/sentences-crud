import { NextFunction, Request, Response } from "express"
import Validator from 'fastest-validator'

export const querySchemaValidator = (schema: any, validator: Validator) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const query = req.query
        const valid = await validator.validate(query, schema)
        if(valid !== true) {
            return res.status(400).json({
                success: false,
                errors: valid
            })
        }
        return next()
    }
}