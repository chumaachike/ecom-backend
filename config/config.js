import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  // ...other configurations
};

// Validate required configuration
if (!config.dbUri) {
  throw new Error('DB_URI must be set');
}

export default config;