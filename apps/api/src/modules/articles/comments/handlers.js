import { eq } from 'drizzle-orm';
import validate from 'express-zod-safe';

import { comments } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';
import { verifyToken } from '#root/middleware/auth.js';
import { params as articleParams } from '#root/modules/articles/validations.js';

import { body, params } from './validations.js';

export const getMany = async (req, res) => {
	const data = await db.query.comments.findMany();
	res.send({ data });
};

export const post = [
	validate({ body, params: articleParams }),
	async (req, res) => {
		const {
			body,
			params: { articleId },
		} = req;

		const data = await db
			.insert(comments)
			.values({ ...body, articleId })
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
			params: { commentId },
		} = req;

		const data = await db.update(comments).set(body).where(eq(comments.id, commentId)).returning();

		res.send({ data });
	},
];

export const del = [
	verifyToken,
	validate({ params }),
	async (req, res) => {
		const { commentId } = req.params;
		const data = await db.delete(comments).where(eq(comments.id, commentId)).returning();
		res.send({ data });
	},
];
