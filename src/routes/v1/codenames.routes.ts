// import Router, { Request } from "express";
// import { sendErrorResponse, convertBytesToMB, convertSecondsToTime } from "src/utils";
// import api from "../../constants";

// import Age from "src/models/mongo/age.model";
// import Continent from "src/models/mongo/continent.model";
// // import Country from "src/models/mongo/country.model";
// import City from "src/models/mongo/city.model";

// const router = Router();

// router.get(api.CODENAMES, async (_req: Request, res: any) => {
//     try {
//         const ages = await Age.find();
//         const continents = await Continent.find();
//         const countries = await Country.find();
//         const cities = await City.find();

//         res.send({
//             ages,
//             continents,
//             countries,
//             cities
//         });
//     } catch (ex) {
//         sendErrorResponse(res, ex);
//     }
// });

// router.get(api.HEALTH, async (_req: Request, res: any) => {
//     try {
//         res.send({
//             uptime: convertSecondsToTime(process.uptime()),
//             uptimeSeconds: process.uptime(),
//             message: "OK",
//             timestamp: Date.now(),
//             memoryUsage: {
//                 rss: convertBytesToMB(process.memoryUsage().rss),
//                 external: convertBytesToMB(process.memoryUsage().external),
//                 heapTotal: convertBytesToMB(process.memoryUsage().heapTotal),
//                 heapUsed: convertBytesToMB(process.memoryUsage().heapUsed)
//             },
//             cpuUsage: process.cpuUsage()
//         });
//     } catch (ex) {
//         sendErrorResponse(res, ex);
//     }
// });

// export default router;
