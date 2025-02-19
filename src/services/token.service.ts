import redisClient from "../config/redis";

const JWT_EXPIRATION = Number(process.env.JWT_EXPIRATION) || 3600;

export const storeToken = async (token: string, userId: string) => {
  await redisClient.setEx(token, JWT_EXPIRATION, userId);
};

export const validateToken = async (token: string) => {
  const userId = await redisClient.get(token);
  return userId !== null;
};

export const revokeToken = async (token: string) => {
  await redisClient.del(token);
};
