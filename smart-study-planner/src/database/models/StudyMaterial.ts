import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';
import User from './User';

class StudyMaterial extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public type!: 'pdf' | 'video' | 'link' | 'note';
  public url!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StudyMaterial.init(
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
    type: {
      type: DataTypes.ENUM('pdf', 'video', 'link', 'note'),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'StudyMaterial',
    tableName: 'study_materials',
  }
);

// Define associations
StudyMaterial.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(StudyMaterial, { foreignKey: 'userId' });

export default StudyMaterial; 