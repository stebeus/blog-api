import { Router } from 'express';

import { articles } from './modules/articles/routes.js';
import { users } from './modules/users/routes.js';

export const api = Router();

api.use('articles', articles);
api.use('users', users);
