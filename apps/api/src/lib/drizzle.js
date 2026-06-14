import { drizzle } from 'drizzle-orm/postgres-js';

import { DB_URL } from '#root/config.js';
import { relations } from '#root/db/relations.js';

export const db = drizzle({
	casing: 'snake_case',
	connection: DB_URL,
	relations,
});
