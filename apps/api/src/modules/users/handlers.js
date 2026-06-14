import { users } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';
import { validate } from '#root/middleware/validations.js';
import { hash } from '#root/utils/auth.js';

import { schema } from './validations.js';

export const signUp = [
	validate(schema),
	async ({ body: { name, email, password } }, res) => {
		const hashedPassword = await hash(password);

		const data = await db
			.insert(users)
			.values({ name, email, password: hashedPassword })
			.returning();

		res.send({ data });
	},
];

export const signIn = async (req, res) => {};

export const signOut = async (req, res) => {};
