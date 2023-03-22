import express from 'express';
import { agendaCntlr, listAgendaCntlr, updatePatientAgendaCntlr, deletePatientAgendaCntlr } from '../controllers/scheluded.controller.js';

const router = express.Router();

router.post('/agenda', agendaCntlr);

router.get('/agenda-list', listAgendaCntlr);

router.patch('/:eventId/edit', updatePatientAgendaCntlr);

router.delete('/:eventId/delete', deletePatientAgendaCntlr);


export default router;