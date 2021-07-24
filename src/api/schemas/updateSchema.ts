import { ValidationSchema } from "fastest-validator";

export const updateSchema: ValidationSchema = {
    text: 'string|optional',
    category: 'string|optional'
}