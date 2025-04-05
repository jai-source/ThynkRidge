import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';
import StudyPlan from './StudyPlan';

class StudyRecommendation extends Model {
  public id!: number;
  public studyPlanId!: number;
  public type!: 'schedule' | 'material' | 'technique' | 'reminder';
  public content!: string;
  public priority!: 'low' | 'medium' | 'high';
  public isApplied!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StudyRecommendation.init(
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
    type: {
      type: DataTypes.ENUM('schedule', 'material', 'technique', 'reminder'),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium',
    },
    isApplied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'StudyRecommendation',
    tableName: 'study_recommendations',
  }
);

// Define associations
StudyRecommendation.belongsTo(StudyPlan, { foreignKey: 'studyPlanId' });
StudyPlan.hasMany(StudyRecommendation, { foreignKey: 'studyPlanId' });

export default StudyRecommendation; 