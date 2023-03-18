import express from 'express';
import authRoutes from './auth.routes.js';
import collaboratorRoutes from './collaborator.routes.js';
import scheduledRoutes from './scheduled.routes.js';
const router = express.Router(); 

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use('/auth', authRoutes);

router.use('/collaborator', collaboratorRoutes);

router.use('/scheduled', scheduledRoutes);

export default router;
