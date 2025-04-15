// backend/routes/aiRoutes.js

import express from 'express';
const router = express.Router();

// Dummy test route
router.get('/test', (req, res) => {
  res.send('✅ AI Route is working!');
});

export default router;
