import { validate } from '#root/middleware/validations.js';

import { schema } from './validations.js';

export const signUp = [validate(schema), async (req, res) => {}];

export const signIn = async (req, res) => {};

export const signOut = async (req, res) => {};
