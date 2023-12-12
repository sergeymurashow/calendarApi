import { ValidationChain, query, validationResult } from 'express-validator'

const getEventByIdValidation: ValidationChain[] = [
	query('id').isNumeric().notEmpty().withMessage('No id provided'),
]

export default {getEventByIdValidation, validationResult}
