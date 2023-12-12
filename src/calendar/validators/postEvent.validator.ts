import { body, validationResult } from 'express-validator'
import dayjs from 'dayjs'

const createEventValidation = [
	body('title').isString().notEmpty().withMessage('No title provided'),
	body('startDate')
		.isDate({ format: `YYYY-MM-DD`, delimiters: ['-'] })
		.withMessage('Wrong startDate format. It must be YYYY-MM-DD')
		.notEmpty()
		.withMessage('No startDate provided'),
	body('endDate')
		.isDate({ format: `YYYY-MM-DD`, delimiters: ['-'] })
		.withMessage('Wrong endDate format. It must be YYYY-MM-DD')
		.notEmpty()
		.withMessage('No endDate provided')
		.custom((value, { req }) => {
			if (dayjs(value).isBefore(dayjs(req.body.startDate))) {
				throw new Error('The endDate must be greater than startDate')
			}
			return true
		}),
]

export default { createEventValidation, validationResult }
