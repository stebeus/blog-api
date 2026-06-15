import { Router } from 'express';

import { comments } from './comments/routes.js';
import { del, getFirst, getMany, patch, post } from './handlers.js';

export const router = Router();

router.get('/', getMany);
router.get('/:id', getFirst);
router.post('/', post);
router.patch('/:id', patch);
router.delete('/:id', del);

router.use('articles', comments);

export { router as articles };
