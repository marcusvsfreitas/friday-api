import { Router } from 'express';
import { privateRoute } from './../config/passport';
import * as ApiController from '../controllers/apiController';
import * as UserController from '../controllers/userController';
import * as WalletController from '../controllers/walletController';

const router = Router();

router.get('/ping', privateRoute, ApiController.ping);
router.post('/register', UserController.register);
router.post('/login', UserController.login);


router.get('/wallets', privateRoute, WalletController.getWallets);
router.get('/wallets/:id', privateRoute, WalletController.getWalletByID);
router.post('/wallets', privateRoute, WalletController.newWallet);
router.put('/wallets/:id', privateRoute, WalletController.editWallet);
router.delete('/wallets/:id', privateRoute, WalletController.deleteWallet);





export default router;