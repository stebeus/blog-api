import { Router } from 'express';

import { comments } from './comments/routes.js';
import { del, getFirst, getMany, patch, post } from './handlers.js';

export const router = Router();

router.get('/', getMany);
router.get('/:articleId', getFirst);
router.post('/', post);
router.patch('/:articleId', patch);
router.delete('/:articleId', del);

router.use('/:articleId/comments', comments);

export { router as articles };
