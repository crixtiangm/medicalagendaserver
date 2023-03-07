import express from 'express';
const router = express.Router();

router.post('/register-collaborator');

router.patch('/edit-collaborator');

router.delete('/delete-collaborator');

router.get('/collaborator/:collaboratorId');

router.get('/list-collaborator');


export default router;