import { defineRelations } from 'drizzle-orm';

import * as schema from './schema.js';

export const relations = defineRelations(schema, (r) => ({
	articles: {
		author: r.one.users({
			from: r.articles.authorId,
			to: r.users.id,
		}),
		comments: r.many.comments({
			from: r.articles.id,
			to: r.comments.articleId,
		}),
	},
}));
