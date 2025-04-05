import { NextApiResponse } from 'next';
import StudyPlan from '../../../database/models/StudyPlan';
import { withAuth, AuthenticatedRequest } from '../../../middleware/auth';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const studyPlanId = parseInt(id as string);

  if (isNaN(studyPlanId)) {
    return res.status(400).json({ message: 'Invalid study plan ID' });
  }

  try {
    const studyPlan = await StudyPlan.findOne({
      where: { id: studyPlanId, userId: req.user!.id },
    });

    if (!studyPlan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }

    if (req.method === 'PUT') {
      const { title, description, startDate, endDate, status } = req.body;

      // Update study plan
      await studyPlan.update({
        title: title || studyPlan.title,
        description: description || studyPlan.description,
        startDate: startDate ? new Date(startDate) : studyPlan.startDate,
        endDate: endDate ? new Date(endDate) : studyPlan.endDate,
        status: status || studyPlan.status,
      });

      return res.status(200).json({
        message: 'Study plan updated successfully',
        studyPlan: await studyPlan.reload(),
      });
    }

    if (req.method === 'DELETE') {
      await studyPlan.destroy();
      return res.status(200).json({
        message: 'Study plan deleted successfully',
      });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Study plan operation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default withAuth(handler); 