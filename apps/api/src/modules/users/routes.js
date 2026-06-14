import { Router } from 'express';

import { signIn, signOut, signUp } from './handlers.js';

const router = Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);

export { router as users };
