import { coerce, object, string, stringbool } from 'zod';

import { articles } from '#root/db/schema.js';
import { useMax, useMin } from '#root/utils/validations.js';

const { title } = articles;

export const body = object({
	title: string()
		.min(...useMin())
		.max(...useMax(title.length, 'Title')),
	content: string().min(...useMin()),
	isPublic: stringbool(),
});

export const params = object({
	id: coerce.number(),
});

export const query = object({
	authorId: coerce.number().optional(),
	isPublic: stringbool().optional(),
});
