import { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromRequest, verifyToken } from '../utils/auth';
import User from '../database/models/User';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: User;
}

export const withAuth = (handler: Function) => async (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const payload = verifyToken(token);
    const user = await User.findByPk(payload.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    return handler(req, res);
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}; 