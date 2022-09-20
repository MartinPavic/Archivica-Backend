import { promisify } from 'util';
const redis = require('redis');

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

const setExRedisAsync = promisify(redisClient.setex).bind(redisClient);
const getRedisAsync = promisify(redisClient.get).bind(redisClient);

const setUserToken = (key: number, time: number, value: string): Promise<string> => {
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

const deleteUserToken = (key: number): Promise<Error | null> => {
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

const getUserToken = (key: number): Promise<string | null> => {
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

redisClient.on('error', (err: any) => {
    console.log('Redis Error: ', err);
});

redisClient.on('ready', () => {
    console.log('Redis Db is ready.');
});

redisClient.on('connect', () => {
    console.log('Redis Db is connecting...');
});

export {
    setUserToken,
    getUserToken,
    deleteUserToken
};
