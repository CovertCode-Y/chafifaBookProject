import redisClient from "../config/redis";

const CACHE_KEY = "search_results";
const MAX_CACHED_RESULTS = 5;

export const saveSearchResult = async (query: string, result: any) => {
  const searchData = JSON.stringify({ query, result });

  await redisClient.lPush(CACHE_KEY, searchData);
  await redisClient.lTrim(CACHE_KEY, 0, MAX_CACHED_RESULTS - 1);
};

export const getCachedSearchResult = async (query: string) => {
  const cachedResults = await redisClient.lRange(CACHE_KEY, 0, -1);
  
  for (const data of cachedResults) {
    const parsed = JSON.parse(data);
    if (parsed.query === query) {
      return parsed.result;
    }
  }
  
  return null;
};
