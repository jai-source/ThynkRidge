import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';
import User from './User';

class StudyPlan extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public startDate!: Date;
  public endDate!: Date;
  public status!: 'pending' | 'in_progress' | 'completed';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StudyPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'StudyPlan',
    tableName: 'study_plans',
  }
);

// Define associations
StudyPlan.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(StudyPlan, { foreignKey: 'userId' });

export default StudyPlan; 