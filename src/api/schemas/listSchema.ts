import { ValidationSchema } from "fastest-validator";

export const listSchema: ValidationSchema = {
    orderBy: 'string',
    order: {
        optional: true,
        type: 'equal',
        values: ['asc', 'desc']
    },
    page: 'number|integer|positive|optional'
}