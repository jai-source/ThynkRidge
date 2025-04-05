import { Sequelize, Options, Dialect } from 'sequelize';

const getSequelizeConfig = (): Options => {
  if (process.env.NODE_ENV === 'production') {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    // Production PostgreSQL configuration
    return {
      dialect: 'postgres' as Dialect,
      host: new URL(databaseUrl).hostname,
      port: parseInt(new URL(databaseUrl).port),
      username: new URL(databaseUrl).username,
      password: new URL(databaseUrl).password,
      database: new URL(databaseUrl).pathname.substring(1),
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
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
    };
  }

  // Development SQLite configuration
  return {
    dialect: 'sqlite' as Dialect,
    storage: './database.sqlite',
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
  };
};

const sequelize = new Sequelize(getSequelizeConfig());

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize; 