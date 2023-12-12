import { Router } from 'express';
import calendar from './calendar';

const router = Router();

router.use('/calendar', calendar);

export default router;