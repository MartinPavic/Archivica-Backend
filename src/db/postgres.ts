import { Sequelize, Options } from "sequelize";
import dotenv from "dotenv";

const env = dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
});

if (env.error) {
	throw env.error;
}

const options: Options = {
	dialect: "postgres",
	host: process.env.PG_HOST,
	port: Number(process.env.PG_PORT) || 5432,
	define: {
		timestamps: false,
	},
	logging: false,
	dialectOptions: {
		decimalNumbers: true,
	},
};

const sequelizeClient = new Sequelize(
	process.env.PG_DB || "archivia_db",
	process.env.PG_USER || "archivia_user",
	process.env.PG_PASSWORD || "123456",
	options,
);

sequelizeClient.authenticate()
	.then(async () => {
		console.info("Connection with Postgres has been established successfully.");
		await sequelizeClient.sync({ alter: true }).then(() => {
			console.info("DB is synced");
			return process.emit("message", "databaseAltered", undefined);
		}).catch(syncErr => {
			console.error("Err while syncing db", syncErr);
		});
	})
	.catch(err => {
		console.error("Unable to connect with Postgres: ", err);
	});

export {
	sequelizeClient,
};