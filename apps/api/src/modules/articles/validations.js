import { object, string, stringbool } from 'zod';

import { useMax, useMin } from '#root/utils/validations.js';

export const schema = object({
	title: string()
		.min(...useMin())
		.max(...useMax(50, 'Title')),
	content: string().min(...useMin()),
	isPublic: stringbool(),
});
