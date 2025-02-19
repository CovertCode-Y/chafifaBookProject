import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379
  }
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

redisClient.connect();

export default redisClient;
