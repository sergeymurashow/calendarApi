class ApiError extends Error {
	constructor(public statusCode: number, public message: string) {
		super()
		this.statusCode = statusCode
		this.message = message
		console.error(this.statusCode, this.message)
	}

	static badRequest(message: string, info?: unknown) {
		message = `${message}\n${info ? prettyPrint(info) : ''}`
		return new ApiError(400, message)
	}

	static notFound(message: string, info?: unknown) {
		message = `${message}\n${info ? prettyPrint(info) : ''}`
		return new ApiError(404, message)
	}

	static internal(message: string, info?: unknown) {
		message = `${message}\n${info ? prettyPrint(info) : ''}`
		return new ApiError(500, message)
	}
}

function prettyPrint(info: unknown) {
	switch (typeof info) {
		case 'string':
			return info
		case 'object':
			return JSON.stringify(info)
		default:
			return info
	}
}

export { ApiError }
