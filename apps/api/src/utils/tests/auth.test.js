import { equal } from 'node:assert/strict';
import { describe, it } from 'node:test';

import { compare, hash } from '#root/utils/auth.js';

describe('compare', () => {
	it('confirms that the password mismatches the hash', async () => {
		// Arrange
		const passwordHash = await hash('Hello, world!');

		// Act
		const isMatch = await compare('Goodbye, world!', passwordHash);

		// Assert
		equal(isMatch, false);
	});

	it('confirms that the password matches the hash', async () => {
		// Arrange
		const passwordHash = await hash('Hello, world!');

		// Act
		const isMatch = await compare('Hello, world!', passwordHash);

		// Assert
		equal(isMatch, true);
	});
});
