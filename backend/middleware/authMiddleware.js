// backend/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
  // You can disable this check temporarily
  next();
};