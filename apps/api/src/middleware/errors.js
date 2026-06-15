import { constants } from 'node:http2';

import { HttpError, isHttpError } from '#root/utils/errors.js';

const { HTTP_STATUS_NOT_FOUND, HTTP_STATUS_FORBIDDEN } = constants;

export const forbiddenError = new HttpError(HTTP_STATUS_FORBIDDEN);

export const handleNotFoundError = (req, res, next) => next(new HttpError(HTTP_STATUS_NOT_FOUND));

export const handleError = (error, req, res, next) => {
	if (res.headersSent) return next(error);

	const { status, message } = isHttpError(error) ? error : new HttpError();

	req.log.error(error);

	res.status(status).send({ status, message });
};
