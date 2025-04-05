import sequelize from './config';
import User from './models/User';
import StudyPlan from './models/StudyPlan';

const initializeDatabase = async () => {
  try {
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
    throw error;
  }
};

export default initializeDatabase; 