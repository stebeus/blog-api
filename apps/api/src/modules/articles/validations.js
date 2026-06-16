import { object, string, stringbool } from 'zod';

import { articles } from '#root/db/schema.js';
import { useMax, useMin } from '#root/utils/validations.js';

const { title } = articles;

export const schema = object({
	body: object({
		title: string()
			.min(...useMin())
			.max(...useMax(title.length, 'Title')),
		content: string().min(...useMin()),
		isPublic: stringbool(),
	}),
});
