import { constants } from 'node:http2';

import { flattenError } from 'zod';

const { HTTP_STATUS_BAD_REQUEST } = constants;

export const validate = (schema) => (req, res, next) => {
	let { body } = req;
	const { data, success, error } = schema.safeParse(body);

	if (!success) {
		const { fieldErrors } = flattenError(error);
		return res.status(HTTP_STATUS_BAD_REQUEST).send({ errors: fieldErrors });
	}

	body = data;

	next();
};
