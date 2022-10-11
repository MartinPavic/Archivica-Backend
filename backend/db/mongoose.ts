import mongoose from "mongoose";
import Age from "../models/mongo/age";
import SubAge from "../models/mongo/subAge";
import Continent from "../models/mongo/continent";
import Country from "../models/mongo/country";
import City from "../models/mongo/city";
import Architect from "../models/mongo/architect";
import ArchitectureStyle from "../models/mongo/architectureStyle";
import ArchitectureType from "../models/mongo/architectureType";
import ArchitectureStatus from "../models/mongo/architectureStatus";
import Post from "../models/mongo/post";
import Blog from "../models/mongo/blog";
mongoose.Promise = global.Promise;

mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => {
        Age.migrateAges();
        SubAge.migrateSubAges();
        Continent.migrateContinents();
        Country.migrateCountries();
        City.migrateCities();
        Architect.migrateArchitects();
        ArchitectureStyle.migrateArchitectureStyles();
        ArchitectureType.migrateArchitectureTypes();
        ArchitectureStatus.migrateStatuses();
        Post.migrateDummyDataPosts();
        Blog.migrateDummyDataBlogs();
        console.log("MongoDB connected");
    })
    .catch((err: any) => {
        console.log("URL: ", process.env.MONGODB_URI);
        console.log("MongoDB Error: ", err);
    });

module.exports = mongoose;
