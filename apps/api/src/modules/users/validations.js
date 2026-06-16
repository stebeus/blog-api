import { email, object, string } from 'zod';

import { useMin } from '#root/utils/validations.js';

const alphaRegex = /[\p{L}\s]+/gu;

export const body = object({
	name: string()
		.min(...useMin())
		.regex(alphaRegex, 'Name must contain only alphabetical characters'),
	email: email('Invalid email').min(...useMin()),
	password: string().min(...useMin(8, 'Password')),
});
