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

redisClient.on("connect", () => {
  console.log("Redis Connected");
});

export default redisClient;
