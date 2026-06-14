import { equal } from 'node:assert/strict';
import { describe, it } from 'node:test';

import { HttpError, isHttpError } from '#root/utils/errors.js';

describe('isHttpError', () => {
	it('confirms that it is not an HTTP error', () => {
		equal(isHttpError(new Error()), false);
	});

	it('confirms that it is an HTTP error', () => {
		equal(isHttpError(new HttpError()), true);
	});
});
