import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
  userId: number;
  email: string;
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
};

export const getTokenFromRequest = (req: NextApiRequest): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  
  const [type, token] = authHeader.split(' ');
  return type === 'Bearer' ? token : null;
}; 