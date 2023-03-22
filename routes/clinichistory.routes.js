import express from 'express';
import { getClinicHistoryCntrl, getClinicHistoryWithPatientIdCntrl, registerClinicHistoryCntrl, updateClinicHistoryCntrl } from '../controllers/clinichistory.controllers.js';

const router = express.Router();

router.post('/register-clinichistory', registerClinicHistoryCntrl);

router.patch('/:clinichistoryId/edit', updateClinicHistoryCntrl);

router.get('/:clinichistoryId', getClinicHistoryCntrl);

router.get('/clinicwithpatientId/:patientId', getClinicHistoryWithPatientIdCntrl);

export default router; 