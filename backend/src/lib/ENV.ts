import 'dotenv/config';

export const ENV = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT,
  NODE_ENV: process.env.ENV,
};
