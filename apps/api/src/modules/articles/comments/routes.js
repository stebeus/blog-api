import { Router } from 'express';

import { del, getMany, patch, post } from './handlers.js';

const router = Router();

router.get('/', getMany);
router.post('/', post);
router.patch('/:id', patch);
router.delete('/:id', del);

export { router as comments };
