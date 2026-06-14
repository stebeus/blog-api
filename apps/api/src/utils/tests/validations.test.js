import { deepEqual } from 'node:assert/strict';
import { describe, it } from 'node:test';

import { useMax, useMin } from '#root/utils/validations.js';

describe('useMin', () => {
	it('returns a tuple of minimum one and a required field message by default', () => {
		deepEqual(useMin(), [1, 'Field is required']);
	});

	it('returns a tuple of minimum two and a descriptive message', () => {
		deepEqual(useMin(2), [2, 'Field must be at least 2 characters long']);
	});

	it('returns a tuple with a custom field name', () => {
		deepEqual(useMin(2, 'Custom field'), [2, 'Custom field must be at least 2 characters long']);
	});
});

describe('useMax', () => {
	it('returns a tuple of maximum one by default', () => {
		deepEqual(useMax(), [1, 'Field cannot be longer than 1 character']);
	});

	it('returns a tuple of maximum two and a pluralized message', () => {
		deepEqual(useMax(2), [2, 'Field cannot be longer than 2 characters']);
	});

	it('returns a tuple with a custom field name', () => {
		deepEqual(useMax(2, 'Custom field'), [2, 'Custom field cannot be longer than 2 characters']);
	});
});
