import validator from '../../validators/getAvailability.validator'
import { getAvailability } from './functions/getAvailability'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../../../errorHandler'

const { validationResult, getAvailabilityValidation } = validator

type getEventByIdRequest = Request & {
	query: { startDate: Date; endDate: Date }
}

async function handler(req: getEventByIdRequest, res: Response, next: NextFunction): Promise<void> {
	const validation = validationResult(req)
	if (!validation.isEmpty()) {
		next(ApiError.badRequest(`Wrong data format:`, validation.array()))
		return
	}

	const { startDate, endDate } = req.query

	try {
		const event = await getAvailability(startDate, endDate)
		res.json(event)
	} catch (error) {
		next(ApiError.internal(`Some error:`, error))
		return
	}
}

export default { validator: getAvailabilityValidation, handler: handler.bind(this) }
