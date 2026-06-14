import { eq } from 'drizzle-orm';

import { articles } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';
import { validate } from '#root/middleware/validations.js';

import { schema } from './validations.js';

export const getMany = async (req, res) => {
	const data = await db.query.articles.findMany();
	res.send({ data });
};

export const getFirst = async ({ params: { id } }, res) => {
	const data = await db.query.articles.findFirst({ where: { id } });
	res.send({ data });
};

export const post = [
	validate(schema),
	async ({ body, user }, res) => {
		const data = await db
			.insert(articles)
			.values({ ...body, authorId: user.id })
			.returning();

		res.send({ data });
	},
];

export const patch = [
	validate(schema),
	async ({ body, params: { id } }, res) => {
		const data = await db.update(articles).set(body).where(eq(articles.id, id)).returning();
		res.send({ data });
	},
];

export const del = [
	async ({ params: { id } }, res) => {
		const data = await db.delete(articles).where(eq(articles.id, id)).returning();
		res.send({ data });
	},
];
