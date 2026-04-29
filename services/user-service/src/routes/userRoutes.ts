import { Router } from 'express';
import { getProfile, updatePreferences } from '../controllers/userController';

const router = Router();

router.get('/profile', getProfile);
router.put('/preferences', updatePreferences);

export default router;
