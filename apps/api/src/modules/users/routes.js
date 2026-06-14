import { Router } from 'express';

import { signIn, signOut, signUp } from './handlers.js';

const router = Router();

router.get('/sign-out', signOut);
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);

export { router as users };
