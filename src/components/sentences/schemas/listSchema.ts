import { ValidationSchema } from "fastest-validator";

export const listSchema: ValidationSchema = {
    orderBy: 'string|optional',
    order: {
        optional: true,
        type: 'enum',
        values: ['asc', 'desc']
    },
    lastId: 'string|optional'
}