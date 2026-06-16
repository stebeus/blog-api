import { eq } from 'drizzle-orm';
import validate from 'express-zod-safe';

import { articles, comments } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';
import { verifyToken } from '#root/middleware/auth.js';

import { body, params, query } from './validations.js';

export const getMany = [
	validate({ query }),
	async (req, res) => {
		const data = await db.query.articles.findMany({ with: { author: true, comments: true } });
		res.send({ data });
	},
];

export const getFirst = [
	validate({ params }),
	async (req, res) => {
		const { id } = req.params;

		const data = await db.query.articles.findFirst({
			where: { id },
			with: { author: true, comments: true },
		});

		res.send({ data });
	},
];

export const post = [
	verifyToken,
	validate({ body }),
	async (req, res) => {
		const { body } = req;
		const { user } = res.locals;

		const data = await db
			.insert(articles)
			.values({ ...body, authorId: user.id })
			.returning();

		res.send({ data });
	},
];

export const patch = [
	verifyToken,
	validate({ body, params }),
	async (req, res) => {
		const {
			body,
			params: { id },
		} = req;

		const data = await db.update(articles).set(body).where(eq(articles.id, id)).returning();

		res.send({ data });
	},
];

export const del = [
	verifyToken,
	validate({ params }),
	async (req, res) => {
		const { id } = req.params;

		const article = await db.delete(articles).where(eq(articles.id, id)).returning();
		const comment = await db.delete(comments).where(eq(comments.articleId, id)).returning();

		res.send({ data: { article, comment } });
	},
];
