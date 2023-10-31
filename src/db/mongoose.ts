import mongoose from "mongoose";
import logger from "../utils/logger";

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

let db: mongoose.Connection;

export const connectMongo = async (): Promise<void> => {

	const url = process.env.MONGODB_URI;
	if (url === undefined) {
		logger.error("No mongo url!");
		return;
	}

	if (db) {
		return;
	}

	await mongoose.connect(url);

	db = mongoose.connection;

	db.once("open", async () => {
		logger.info("Connected to mongo db");
	});

	db.on("error", () => {
		logger.error("Error connecting to mongo db");
	});

};

export const disconnectMongo = (): void => {

	if (!db) {
		return;
	}

	mongoose.disconnect();

	db.once("close", async () => {
		logger.info("Diconnected to mongo db");
	});

};