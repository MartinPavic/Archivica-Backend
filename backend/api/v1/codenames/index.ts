import Router from 'express';
import { IRequest } from 'interfaces/express';
import { sendErrorResponse, convertBytesToMB, convertSecondsToTime } from 'utils';
import api from '../../../constants';

const Age = require('models/mongo/age');
const Continent = require('models/mongo/continent');
const Country = require('models/mongo/country');
const City = require('models/mongo/city');
const router = Router();

router.get(api.CODENAMES, async (_req: IRequest, res: any) => {
    try {
        const ages = await Age.find();
        const continents = await Continent.find();
        const countries = await Country.find();
        const cities = await City.find();

        res.send({
            ages,
            continents,
            countries,
            cities
        });
    } catch (ex) {
        sendErrorResponse(res, ex);
    }
});

router.get(api.HEALTH, async (_req: IRequest, res: any) => {
    try {
        res.send({
            uptime: convertSecondsToTime(process.uptime()),
            uptimeSeconds: process.uptime(),
            message: 'OK',
            timestamp: Date.now(),
            memoryUsage: {
                rss: convertBytesToMB(process.memoryUsage().rss),
                external: convertBytesToMB(process.memoryUsage().external),
                heapTotal: convertBytesToMB(process.memoryUsage().heapTotal),
                heapUsed: convertBytesToMB(process.memoryUsage().heapUsed)
            },
            cpuUsage: process.cpuUsage()
        });
    } catch (ex) {
        sendErrorResponse(res, ex);
    }
});

export default router;
