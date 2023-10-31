import { promisify } from "util";
import redis from "redis";
import logger from "../utils/logger";

const redisClient = redis.createClient({
	url: process.env.REDIS_URL,
});

const setExRedisAsync = promisify(redisClient.setex).bind(redisClient);
const getRedisAsync = promisify(redisClient.get).bind(redisClient);

const setUserToken = (key: number | string, time: number, value: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		redisClient.select(0, async (err: any, res: string | PromiseLike<string>) => {
			if (err) {
				reject(err);
			}
			await setExRedisAsync(key.toString(), time, value);
			resolve(res);
		});
	});
};

const deleteUserToken = (key: string): Promise<Error | null> => {
	return new Promise((resolve, reject) => {
		redisClient.select(0, async (err: any) => {
			if (err) {
				reject(err);
			}
			redisClient.del(key.toString(), (result: Error | PromiseLike<Error | null> | null) => {
				resolve(result);
			});
		});
	});
};

const getUserToken = (key: string): Promise<string | null> => {
	return new Promise((resolve, reject) => {
		redisClient.select(0, async (err: any) => {
			if (err) {
				reject(err);
			}

			const result = await getRedisAsync(key.toString());
			resolve(result);
		});
	});
};

redisClient.on("error", (err: any) => {
	logger.error(`Redis ${process.env.REDIS_URL} Error: `, err);
});

redisClient.on("ready", () => {
	logger.info("Redis Db is ready.");
});

redisClient.on("connect", () => {
	logger.info("Redis Db is connecting to url: " + process.env.REDIS_URL);
});

export {
	setUserToken,
	getUserToken,
	deleteUserToken,
};
