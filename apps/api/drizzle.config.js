import { defineConfig } from 'drizzle-kit';

import { DB_URL } from './src/config.js';

export default defineConfig({
	casing: 'snake_case',
	dialect: 'postgresql',
	schema: './src/db/schema.js',
	dbCredentials: {
		url: DB_URL,
	},
});
