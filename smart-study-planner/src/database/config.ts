import { Sequelize } from 'sequelize';

const getDatabasePath = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/tmp/database.sqlite';
  }
  return './database.sqlite';
};

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: getDatabasePath(),
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  retry: {
    max: 3
  }
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize; 