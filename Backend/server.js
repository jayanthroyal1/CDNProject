import app from "./src/app.js";
import { connectDatabase } from "./src/config/databaseConnection.js";
import { env } from "./src/config/env.js";
import redisClient from "./src/config/redis.js";

const startServer = async () => {
  await connectDatabase();

  await redisClient.connect();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();
