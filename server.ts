import express from "express";
import api from "./src/routes/v1";
import path from "path";
import { connectMongo } from "./src/db/mongoose";
// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-var-requires
require("dotenv").config();

async function run(): Promise<void> {
	const app = express();

	await connectMongo();

	app.use("/", api);
	app.use("/public", express.static(path.join(__dirname, "resources")));

	app.disable("x-powered-by");

	app.listen(process.env.PORT, (): void => {
		console.info("*************** Environment: " + process.env.NODE_ENV + " ********************");
		console.info(`Server is running on port ${process.env.PORT}`);
	});
}

run();