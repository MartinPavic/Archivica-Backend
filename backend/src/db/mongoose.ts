import mongoose from "mongoose";
import Age from "../models/mongo/age.model";
// import SubAge from "../models/mongo/subAge.model";
// import Continent from "../models/mongo/continent.model";
// import Country from "../models/mongo/country.model";
import City from "../models/mongo/city.model";
import Architect from "../models/mongo/architect.model";
// import ArchitectureStyle from "../models/mongo/architectureStyle.model";
// import { PostModel } from "../models/mongo/post.model";
// import Blog from "../models/mongo/blog.model";
mongoose.Promise = global.Promise;

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
        Age.migrateAges();
        // SubAge.migrateSubAges();
        // Continent.migrateContinents();
        // Country.migrateCountries();
        City.migrateCities();
        Architect.migrateArchitects();
        // PostModel.migrateDummyDataPosts();
        // Blog.migrateDummyDataBlogs();
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