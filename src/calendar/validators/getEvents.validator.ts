import { query, validationResult } from 'express-validator'
import dayjs from 'dayjs'

const getEventsByPeriodValidation = [
	query('startDate')
		.isDate({ format: `YYYY-MM-DD`, delimiters: ['-'] })
		.withMessage('Wrong startDate format. It must be YYYY-MM-DD')
		.notEmpty()
		.withMessage('No startDate provided'),
	query('endDate')
		.isDate({ format: `YYYY-MM-DD`, delimiters: ['-'] })
		.withMessage('Wrong endDate format. It must be YYYY-MM-DD')
		.notEmpty()
		.withMessage('No endDate provided')
		.custom((value, { req }) => {
			if (dayjs(value).isBefore(dayjs(req.query.startDate))) {
				throw new Error('endDate must be greater than startDate')
			}
			return true
		}),
]

export default { getEventsByPeriodValidation, validationResult }
