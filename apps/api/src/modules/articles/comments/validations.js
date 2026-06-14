import { object, string } from 'zod';

import { useMax, useMin } from '#root/utils/validations.js';

export const schema = object({
	author: string()
		.min(...useMin())
		.max(...useMax(100, 'Your name')),
	content: string()
		.min(...useMin())
		.max(...useMax(500, 'Comment')),
});
