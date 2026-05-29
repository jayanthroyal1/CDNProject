import { createClient } from "redis";
import { env } from "./env.js";

const redisClient = createClient({
  socket: {
    host: env.redisHost,
    port: env.redisPort,
  },
});

redisClient.on("error", (err) => {
  console.error("Redis Error", err);
});

export default redisClient;
