import validator from '../../validators/postEvent.validator'
import createEvent from './functions/createEvent'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../../../errorHandler'

const { validationResult, createEventValidation } = validator

type createEventRequest = Request & {
	body: { title: string; startDate: string; endDate: string }
}

async function handler(req: createEventRequest, res: Response, next: NextFunction) {
	const validation = validationResult(req)
	if (!validation.isEmpty()) {
		next(ApiError.badRequest(`Wrong data format:`, validation.array()))
		return
	}

	const { title, startDate, endDate } = req.body

	try {
		const newEvent = await createEvent(title, startDate, endDate)
		res.json({ ...newEvent })
	} catch (error) {
		next(ApiError.internal(`Some error:`, error))
		return
	}
}

export default { validator: createEventValidation, handler: handler.bind(this) }
