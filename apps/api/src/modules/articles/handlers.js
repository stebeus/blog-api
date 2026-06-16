import { eq } from 'drizzle-orm';

import { articles, comments } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';
import { verifyToken } from '#root/middleware/auth.js';
import { validate } from '#root/middleware/validations.js';

import { schema } from './validations.js';

export const getMany = async (req, res) => {
	const data = await db.query.articles.findMany({ with: { author: true, comments: true } });
	res.send({ data });
};

export const getFirst = async (req, res) => {
	const { id } = req.params;

	const data = await db.query.articles.findFirst({
		where: { id },
		with: { author: true, comments: true },
	});

	res.send({ data });
};

export const post = [
	verifyToken,
	validate(schema),
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
	validate(schema),
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
	async (req, res) => {
		const { id } = req.params;

		const article = await db.delete(articles).where(eq(articles.id, id)).returning();
		const comment = await db.delete(comments).where(eq(comments.articleId, id)).returning();

		res.send({ data: { article, comment } });
	},
];
