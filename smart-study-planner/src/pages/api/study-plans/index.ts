import { NextApiResponse } from 'next';
import StudyPlan from '../../../database/models/StudyPlan';
import { withAuth, AuthenticatedRequest } from '../../../middleware/auth';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const studyPlans = await StudyPlan.findAll({
      where: { userId: req.user!.id },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      studyPlans,
    });
  } catch (error) {
    console.error('Error fetching study plans:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default withAuth(handler); 