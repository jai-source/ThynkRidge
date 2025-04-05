import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import StudyRecommendation from '../../../database/models/StudyRecommendation';
import StudyPlan from '../../../database/models/StudyPlan';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { studyPlanId } = req.query;

  if (req.method === 'GET') {
    try {
      const recommendations = await StudyRecommendation.findAll({
        where: { studyPlanId },
        order: [
          ['priority', 'DESC'],
          ['createdAt', 'DESC'],
        ],
      });
      return res.status(200).json(recommendations);
    } catch (error) {
      console.error('Error fetching study recommendations:', error);
      return res.status(500).json({ error: 'Failed to fetch study recommendations' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { type, content, priority } = req.body;

      // Validate study plan exists and belongs to user
      const studyPlan = await StudyPlan.findOne({
        where: { id: studyPlanId, userId: token.sub },
      });

      if (!studyPlan) {
        return res.status(404).json({ error: 'Study plan not found' });
      }

      const recommendation = await StudyRecommendation.create({
        studyPlanId,
        type,
        content,
        priority: priority || 'medium',
        isApplied: false,
      });

      return res.status(201).json(recommendation);
    } catch (error) {
      console.error('Error creating study recommendation:', error);
      return res.status(500).json({ error: 'Failed to create study recommendation' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, isApplied } = req.body;

      const recommendation = await StudyRecommendation.findOne({
        where: { id, studyPlanId },
        include: [{
          model: StudyPlan,
          where: { userId: token.sub },
        }],
      });

      if (!recommendation) {
        return res.status(404).json({ error: 'Recommendation not found' });
      }

      await recommendation.update({ isApplied });
      return res.status(200).json(recommendation);
    } catch (error) {
      console.error('Error updating study recommendation:', error);
      return res.status(500).json({ error: 'Failed to update study recommendation' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 