import { Response } from 'express'
import { ApiError, DatabaseError, RequestError } from 'src/errors'

export const errorService = () => {
    
	async function handle(err: Error, res?: Response) {
		if (err instanceof ApiError) handleApiError(err, res)
		else handleError(res)
	}

	function handleApiError(error: ApiError, res?: Response) {
		if (error instanceof RequestError) handleRequestError(res)
		else if (error instanceof DatabaseError) handleDatabaseError(res)
		else handleError(res)
	}

	function handleError(res?: Response) {
		if (res) {
			res.status(500).json({
				data: null,
				success: false,
				errors: [{ message: 'Server Error' }]
			})
		}
	}

	function handleRequestError(res?: Response) {
		if (res) {
			res.status(500).json({
				success: false,
				msg: 'Server internal error: failed to fetch a third party API'
			})
		}
	}

	function handleDatabaseError(res?: Response) {
		if (res) {
			res.status(500).json({
				success: false,
				msg: 'Server internal error: error fetching from database'
			})
		}
	}
    
    return { handle }
}