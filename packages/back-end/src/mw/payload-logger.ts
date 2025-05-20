import { logger } from "@dartsFlow/opentelemetry"
import type { Request, Response, NextFunction } from "express"

export const logRequestResponseMw = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const requestBody = { ...req.body }

	logger.info("Incomming request", requestBody, {
		method: req.method,
		path: req.originalUrl,
	})
	const originalSend = res.send

	res.send = function (body) {
		logger.info("Request response", body, {
			method: req.method,
			path: req.originalUrl,
		})
		return originalSend.call(this, body)
	}

	next()
}
