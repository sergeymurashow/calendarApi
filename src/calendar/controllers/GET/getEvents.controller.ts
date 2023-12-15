import validator from '../../validators/getEvents.validator'
import { getEventsByPeriod } from './functions/getEventsByPeriod'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../../../errorHandler'

const { validationResult, getEventsByPeriodValidation } = validator

type getEventsByPeriodRequest = Request & { query: { startDate: Date; endDate: Date } }

async function handler(req: getEventsByPeriodRequest, res: Response, next: NextFunction): Promise<void> {
	const validation = validationResult(req)
	if (!validation.isEmpty()) {
		next(ApiError.badRequest(`Wrong data format:`, validation.array()))
		return
	}
	try {
		const { startDate, endDate } = req.query

		const event = await getEventsByPeriod(startDate, endDate)
		res.json(event)
	} catch (error) {
		next(ApiError.internal(`Some error:`, error))
		return
	}
}

export default { validator: getEventsByPeriodValidation, handler: handler.bind(this) }
