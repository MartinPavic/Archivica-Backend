const mongoose = require('mongoose');
const Age = require('../models/mongo/age');
const SubAge = require('../models/mongo/subAge');
const Continent = require('../models/mongo/continent');
const Country = require('../models/mongo/country');
const City = require('../models/mongo/city');
const Architect = require('../models/mongo/architect');
const ArchitectureStyle = require('../models/mongo/architectureStyle');
const ArchitectureType = require('../models/mongo/architectureType');
const ArchitectureStatus = require('../models/mongo/architectureStatus');
const Post = require('../models/mongo/post');
const Blog = require('../models/mongo/blog');
mongoose.Promise = global.Promise;

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
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
        console.log('MongoDB connected');
    })
    .catch((err: any) => {
        console.log('URL: ', process.env.MONGODB_URI);
        console.log('MongoDB Error: ', err);
    });

module.exports = mongoose;
