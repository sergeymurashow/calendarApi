import { ApiError } from '../errorHandler'
import { Request, Response, NextFunction } from 'express'

function apiErrorMiddleware(err: ApiError, req: Request, res: Response, next: NextFunction) {
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json({ message: err.message })
	}

	return res.status(500).json({ message: 'Something went wrong' })
}

export { apiErrorMiddleware }
