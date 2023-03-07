import express from "express";
import { isAuthenticated } from '../middleware/jwt.middleware.js'
import { loginCntlr, signupCntlr, verifyCntlr } from '../controllers/auth.controllers.js'
const router = express.Router();


router.post('/login', loginCntlr);

router.post('/signup', signupCntlr);

router.get('/verify', isAuthenticated, verifyCntlr);



export default router;





