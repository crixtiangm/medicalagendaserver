import express from 'express';
import authRoutes from './auth.routes.js';
import collaboratorRoutes from './collaborator.routes.js';
import scheduledRoutes from './scheduled.routes.js';
import patientRoutes from './patient.routes.js';
import clinichistoryRoutes from './clinichistory.routes.js';
import ailmentRoutes from './ailment.routes.js';
const router = express.Router(); 

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use('/auth', authRoutes);

router.use('/collaborator', collaboratorRoutes);

router.use('/scheduled', scheduledRoutes);

router.use('/patient', patientRoutes);

router.use('/clinichistory', clinichistoryRoutes);

router.use('/ailment', ailmentRoutes);

export default router;
