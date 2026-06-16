import { object, string } from 'zod';

import { comments } from '#root/db/schema.js';
import { useMax, useMin } from '#root/utils/validations.js';

const { author, content } = comments;

export const schema = object({
	body: object({
		author: string()
			.min(...useMin())
			.max(...useMax(author.length, 'Your name')),
		content: string()
			.min(...useMin())
			.max(...useMax(content.length, 'Comment')),
	}),
});
