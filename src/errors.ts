export class ApiError extends Error {
    constructor(description: string) {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
        Error.captureStackTrace(this)
    }
}

export class NotFoundError extends ApiError {
    constructor(description: string) { super(description) }
}

export class DatabaseError extends ApiError {
	constructor(description: string) { super(description) }
}

export class RequestError extends ApiError {
	constructor(description: string) { super(description) }
}