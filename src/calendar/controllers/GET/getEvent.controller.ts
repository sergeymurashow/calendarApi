import validator from '../../validators/getEvent.validator'
import { getEventById } from './functions/getEventById'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../../../errorHandler'

const { validationResult, getEventByIdValidation } = validator

type getEventByIdRequest = Request & { query: { id: string } }

async function handler(req: getEventByIdRequest, res: Response, next: NextFunction): Promise<void> {
	const validation = validationResult(req)
	if (!validation.isEmpty()) {
		next(ApiError.badRequest(`Wrong data format:`, validation.array()))
		return
	}
	try {
		const event = await getEventById(req.query.id)
		res.json(event)
	} catch (error) {
		next(ApiError.internal(`Some error:`, error))
		return
	}
}

export default { validator: getEventByIdValidation, handler: handler.bind(this) }
