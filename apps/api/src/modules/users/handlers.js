import { users } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';
import { authenticate } from '#root/middleware/auth.js';
import { validate } from '#root/middleware/validations.js';
import { hash } from '#root/utils/auth.js';

import { schema } from './validations.js';

export const signUp = [
	validate(schema),
	async (req, res) => {
		const { name, email, password } = req.body;

		const hashedPassword = await hash(password);

		const data = await db
			.insert(users)
			.values({ name, email, password: hashedPassword })
			.returning();

		res.send({ data });
	},
];

export const signIn = [authenticate];

export const signOut = async (req, res) => {};
