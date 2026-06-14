import { env, loadEnvFile } from 'node:process';

try {
	loadEnvFile();
} catch (error) {
	if (error.code !== 'ENOENT') throw error;
}

export const { DB_URL, JWT_SECRET_KEY, PORT = 3000 } = env;
