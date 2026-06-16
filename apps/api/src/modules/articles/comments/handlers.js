import { eq } from 'drizzle-orm';
import validate from 'express-zod-safe';

import { comments } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';
import { verifyToken } from '#root/middleware/auth.js';

import { body, params } from './validations.js';

export const getMany = async (req, res) => {
	const data = await db.query.comments.findMany();
	res.send({ data });
};

export const post = [
	validate({ body }),
	async (req, res) => {
		const { body } = req;
		const data = await db.insert(comments).values(body).returning();
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

		const data = await db.update(comments).set(body).where(eq(comments.id, id)).returning();

		res.send({ data });
	},
];

export const del = [
	verifyToken,
	validate({ params }),
	async (req, res) => {
		const { id } = req.params;
		const data = await db.delete(comments).where(eq(comments.id, id)).returning();
		res.send({ data });
	},
];
