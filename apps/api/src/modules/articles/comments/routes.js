import { Router } from 'express';

import { del, getMany, patch, post } from './handlers.js';

const router = Router({ mergeParams: true });

router.get('/', getMany);
router.post('/', post);
router.patch('/:commentId', patch);
router.delete('/:commentId', del);

export { router as comments };
