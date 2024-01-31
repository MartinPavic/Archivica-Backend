import express from "express";
import api from "./routes/v1";
import path from "path";
import { connectMongo } from "./db/mongoose";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import documentation from "./swagger";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run(): Promise<void> {
	const app = express();

	await connectMongo();

	app.use("/", api);
	app.use("/public", express.static(path.join(__dirname, "resources")));
	documentation(app);

	app.disable("x-powered-by");

	app.listen(process.env.PORT, (): void => {
		console.info("*************** Environment: " + process.env.NODE_ENV + " ********************");
		console.info(`Server is running on port ${process.env.PORT}`);
	});
}

run();
