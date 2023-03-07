import express from 'express';
import authRoutes from './auth.routes.js';
const router = express.Router(); 

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use('/auth', authRoutes);

export default router;
