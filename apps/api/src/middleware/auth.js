import { constants } from 'node:http2';

import jwt from 'jsonwebtoken';

import { JWT_SECRET_KEY } from '#root/config.js';
import { db } from '#root/lib/drizzle.js';
import { compare } from '#root/utils/auth.js';

import { forbiddenError } from './errors.js';

const { HTTP_STATUS_BAD_REQUEST } = constants;

export const authenticate = async ({ body: { email, password } }, res, next) => {
	const error = 'Invalid credentials';

	const user = await db.query.users.findFirst({ where: { email } });
	if (user == null) return res.status(HTTP_STATUS_BAD_REQUEST).send({ error });

	const isMatch = await compare(password, user.password);
	if (!isMatch) return res.status(HTTP_STATUS_BAD_REQUEST).send({ error });

	const token = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: '1h' });
	res.send({ token });
};

export const verifyToken = ({ headers: { authorization } }, res, next) => {
	if (authorization == null) return next(forbiddenError);

	const [, token] = authorization.split(' ');

	jwt.verify(token, JWT_SECRET_KEY, (error, { user }) => {
		res.locals.user = user;
		next(error != null && forbiddenError);
	});
};
