import { Router } from 'express';

import { articles } from './modules/articles/routes.js';
import { users } from './modules/users/routes.js';

const router = Router();

router.use('/articles', articles);
router.use('/users', users);

export { router as api };
