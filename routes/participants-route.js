
import auth from '../middleware/auth.js';
import { Router } from 'express'
import { postCreateParticipant, postDeleteParticipant, postFetchAllStudentInClass } from '../controllers/participants-controller.js';

const router = Router();

router.post('/create',auth,postCreateParticipant);
router.post('/fetch-students',auth,postFetchAllStudentInClass);
router.post('/delete',auth,postDeleteParticipant)

export default router;