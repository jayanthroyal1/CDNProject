import app from "./src/app.js";

import { connectDatabase } from "./src/config/databaseConnection.js";

import { env } from "./src/config/env.js";

import redisClient from "./src/config/redis.js";

import logger from "./src/logger/logger.js";

const startServer = async () => {
  try {
    await connectDatabase();

    logger.info("MongoDB Connected");

    await redisClient.connect();

    logger.info("Redis Connected");

    app.listen(env.port, () => {
      logger.info(`Server running on port ${env.port}`);
    });
  } catch (error) {
    logger.error(error.message);

    process.exit(1);
  }
};

startServer();
