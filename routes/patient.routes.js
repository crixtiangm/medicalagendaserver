import express from 'express';
import { getPatientIdCntlr, listPatientCntlr, registerPatientCntlr, updatePatientCntlr } from '../controllers/patient.controllers.js';

const router = express.Router();

router.post('/register-patient', registerPatientCntlr);

router.patch('/:patientId/edit', updatePatientCntlr);

router.get('/patient-list', listPatientCntlr);

router.get('/:patientId', getPatientIdCntlr);

export default router;