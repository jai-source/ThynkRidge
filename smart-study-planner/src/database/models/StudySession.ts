import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';
import StudyPlan from './StudyPlan';

class StudySession extends Model {
  public id!: number;
  public studyPlanId!: number;
  public title!: string;
  public description!: string;
  public startTime!: Date;
  public endTime!: Date;
  public status!: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  public progress!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StudySession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    studyPlanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: StudyPlan,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('scheduled', 'in_progress', 'completed', 'cancelled'),
      defaultValue: 'scheduled',
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
  },
  {
    sequelize,
    modelName: 'StudySession',
    tableName: 'study_sessions',
  }
);

// Define associations
StudySession.belongsTo(StudyPlan, { foreignKey: 'studyPlanId' });
StudyPlan.hasMany(StudySession, { foreignKey: 'studyPlanId' });

export default StudySession; 