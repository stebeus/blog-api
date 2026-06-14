import { eq } from 'drizzle-orm';

import { comments } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';
import { validate } from '#root/middleware/validations.js';

import { schema } from './validations.js';

export const getMany = async (req, res) => {
	const data = await db.query.comments.findMany();
	res.send({ data });
};

export const post = [
	validate(schema),
	async ({ body }, res) => {
		const data = await db.insert(comments).values(body).returning();
		res.send({ data });
	},
];

export const patch = [
	validate(schema),
	async ({ body, params: { id } }, res) => {
		const data = await db.update(comments).set(body).where(eq(comments.id, id)).returning();
		res.send({ data });
	},
];

export const del = [
	async ({ params: { id } }, res) => {
		const data = await db.delete(comments).where(eq(comments.id, id)).returning();
		res.send({ data });
	},
];
