import { NextApiResponse } from 'next';
import StudyPlan from '../../../database/models/StudyPlan';
import { withAuth, AuthenticatedRequest } from '../../../middleware/auth';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { title, description, startDate, endDate } = req.body;

    // Validate input
    if (!title || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create study plan
    const studyPlan = await StudyPlan.create({
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId: req.user!.id,
      status: 'pending',
    });

    res.status(201).json({
      message: 'Study plan created successfully',
      studyPlan,
    });
  } catch (error) {
    console.error('Study plan creation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default withAuth(handler); 