import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import StudyMaterial from '../../../database/models/StudyMaterial';
import StudyPlan from '../../../database/models/StudyPlan';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { studyPlanId } = req.query;

  if (req.method === 'GET') {
    try {
      const materials = await StudyMaterial.findAll({
        where: { studyPlanId },
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json(materials);
    } catch (error) {
      console.error('Error fetching study materials:', error);
      return res.status(500).json({ error: 'Failed to fetch study materials' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, description, type, url, content } = req.body;

      // Validate study plan exists and belongs to user
      const studyPlan = await StudyPlan.findOne({
        where: { id: studyPlanId, userId: token.sub },
      });

      if (!studyPlan) {
        return res.status(404).json({ error: 'Study plan not found' });
      }

      const material = await StudyMaterial.create({
        studyPlanId,
        title,
        description,
        type,
        url,
        content,
      });

      return res.status(201).json(material);
    } catch (error) {
      console.error('Error creating study material:', error);
      return res.status(500).json({ error: 'Failed to create study material' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 