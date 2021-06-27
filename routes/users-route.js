import { postLogin, postRegister, postUser } from '../controllers/users-controller.js';
import auth from '../middleware/auth.js';
import { Router } from 'express'

const router = Router();

router.post('/register',postRegister );
router.post('/login',postLogin);
router.post('/user',auth,postUser);

export default router;