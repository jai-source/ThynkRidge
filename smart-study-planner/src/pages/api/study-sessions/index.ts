import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import StudySession from '../../../database/models/StudySession';
import StudyPlan from '../../../database/models/StudyPlan';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { studyPlanId } = req.query;

  if (req.method === 'GET') {
    try {
      const sessions = await StudySession.findAll({
        where: { studyPlanId },
        order: [['startTime', 'ASC']],
      });
      return res.status(200).json(sessions);
    } catch (error) {
      console.error('Error fetching study sessions:', error);
      return res.status(500).json({ error: 'Failed to fetch study sessions' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, description, startTime, endTime } = req.body;

      // Validate study plan exists and belongs to user
      const studyPlan = await StudyPlan.findOne({
        where: { id: studyPlanId, userId: token.sub },
      });

      if (!studyPlan) {
        return res.status(404).json({ error: 'Study plan not found' });
      }

      const newSession = await StudySession.create({
        studyPlanId,
        title,
        description,
        startTime,
        endTime,
        status: 'scheduled',
        progress: 0,
      });

      return res.status(201).json(newSession);
    } catch (error) {
      console.error('Error creating study session:', error);
      return res.status(500).json({ error: 'Failed to create study session' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 