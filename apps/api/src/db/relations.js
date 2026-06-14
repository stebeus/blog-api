import { defineRelations } from 'drizzle-orm';

import * as schema from './schema.js';

export const relations = defineRelations(schema, (r) => ({
	articles: {
		author: r.one.users({
			from: r.articles.authorId,
			to: r.users.id,
		}),
	},
	comments: {
		article: r.one.articles({
			from: r.comments.articleId,
			to: r.articles.id,
		}),
	},
}));
