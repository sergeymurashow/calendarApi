import { query, validationResult, oneOf } from 'express-validator'
import dayjs from 'dayjs'

const getAvailabilityValidation = [
	query('startDate')
		.notEmpty()
		.withMessage('No startDate provided')
		.isDate({ format: `YYYY-MM-DD`, delimiters: ['-'] })
		.withMessage('Wrong startDate format. It must be YYYY-MM-DD'),
	query('endDate')
		.notEmpty()
		.isDate({ format: `YYYY-MM-DD`, delimiters: ['-'] })
		.withMessage('Wrong endDate format. It must be YYYY-MM-DD')
		.withMessage('No endDate provided')
		// .custom((value, { req }) => {
		// 	if (dayjs(value).isBefore(dayjs(req.body.startDate))) {
		// 		throw new Error('endDate must be greater than startDate')
		// 	}
		// 	return true
		// }),
]

export default { getAvailabilityValidation, validationResult }

