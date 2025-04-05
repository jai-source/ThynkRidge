import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'production' 
    ? '/tmp/database.sqlite' // Vercel uses /tmp for writable storage
    : './database.sqlite',
  logging: false,
});

export default sequelize; 