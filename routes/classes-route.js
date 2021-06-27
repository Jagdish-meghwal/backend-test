
import auth from '../middleware/auth.js';
import { Router } from 'express'
import { getFetchClass, postCreateClass, postDeleteClass, postFetchAllClassesByStudentId, putEditClass } from '../controllers/classes-controller.js';

const router = Router();

router.post('/create',auth,postCreateClass);
router.post('/fetch-classes-by-student-id',auth,postFetchAllClassesByStudentId);
router.post('/delete',auth,postDeleteClass);

router.put('/edit',auth,putEditClass);
router.get('/:class_id',auth,getFetchClass);

export default router;