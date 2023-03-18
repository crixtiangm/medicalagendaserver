import express from 'express';
import { signupCntlr, registerCntrl, getCollaboratorIdCntrl } from '../controllers/collaborator.controllers.js';
const router = express.Router();

router.post('/signup-collaborator', signupCntlr);

router.post('/data-collaborator', registerCntrl);

router.get('/get-collaborator/:userId', getCollaboratorIdCntrl);


export default router;