import { Router } from 'express';
import { privateRoute } from './../config/passport';
import * as ApiController from '../controllers/apiController';

const router = Router();

router.get('/ping', privateRoute, ApiController.ping)

router.post('/register', ApiController.register)
router.post('/login', ApiController.login)

export default router;