import { constants } from 'node:http2';

import { sql } from 'drizzle-orm';
import * as jwt from 'jsonwebtoken';

import { JWT_SECRET_KEY } from '#root/config.js';
import { users } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';
import { validate } from '#root/middleware/validations.js';
import { hash } from '#root/utils/auth.js';

import { schema } from './validations.js';

const { HTTP_STATUS_OK, HTTP_STATUS_BAD_REQUEST } = constants;

const isEmailTaken = (email) =>
	db.execute(sql`SELECT EXISTS (SELECT 1 FROM users WHERE username = ${email})`);

export const signUp = [
	validate(schema),
	async ({ body: { name, email, password } }, res) => {
		if (isEmailTaken(email)) {
			return res.status(HTTP_STATUS_BAD_REQUEST).send({ error: 'Email already taken' });
		}

		const hashedPassword = await hash(password);

		const data = await db
			.insert(users)
			.values({ name, email, password: hashedPassword })
			.returning();

		res.send({ data });
	},
];

export const signIn = ({ body }, res) => {
	jwt.sign({ body }, JWT_SECRET_KEY, (error, token) => {
		const [status, data] =
			error == null ? [HTTP_STATUS_OK, token] : [HTTP_STATUS_BAD_REQUEST, error];
		res.status(status).send(data);
	});
};

export const signOut = async (req, res) => {};
