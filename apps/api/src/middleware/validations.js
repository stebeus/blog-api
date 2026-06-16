import { constants } from 'node:http2';

import { flattenError } from 'zod';

const { HTTP_STATUS_BAD_REQUEST } = constants;

export const validate = (schema) => (req, res, next) => {
	const { body, params, query } = req;
	const { data, success, error } = schema.safeParse({ body, params, query });

	if (!success) {
		const { fieldErrors } = flattenError(error);
		return res.status(HTTP_STATUS_BAD_REQUEST).send({ errors: fieldErrors });
	}

	const keys = ['body', 'params', 'query'];

	for (const key of keys) {
		if (!Object.hasOwn(req, key)) break;
		req[key] = data[key];
	}

	next();
};
