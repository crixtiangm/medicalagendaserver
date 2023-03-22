import express from 'express';
import { getAilmentIdCntrl, getAilmentWithPatientIdCntlr, registerAilmentCntrl, updateAilmentCntrl } from '../controllers/ailment.controllers.js';


const router = express.Router();

router.post('/register-ailment', registerAilmentCntrl);

router.patch('/:ailmentId/edit', updateAilmentCntrl);

router.get('/:ailmentId', getAilmentIdCntrl);

router.get('/ailmentwithdata/:patientId', getAilmentWithPatientIdCntlr);

export default router;