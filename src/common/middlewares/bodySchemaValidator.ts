import { NextFunction, Request, Response } from "express"
import Validator from 'fastest-validator'

export const bodySchemaValidator = (schema: any, validator: Validator) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body
        const valid = await validator.validate(body, schema)
        if(valid !== true) {
            return res.status(400).json({
                success: false,
                errors: valid
            })
        }
        return next()
    }
}