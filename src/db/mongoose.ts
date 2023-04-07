import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

let db: mongoose.Connection;

export const connectMongo = async (): Promise<void> => {

	const url = process.env.MONGODB_URI;
	if (url === undefined) {
		console.log("No mongo url!");
		return;
	}

	if (db) {
		return;
	}

	await mongoose.connect(url);

	db = mongoose.connection;

	db.once("open", async () => {
		console.log("Connected to db");
	});

	db.on("error", () => {
		console.log("Error connecting to db");
	});

};

export const disconnectMongo = (): void => {

	if (!db) {
		return;
	}

	mongoose.disconnect();

	db.once("close", async () => {
		console.log("Diconnected  to db");
	});

};