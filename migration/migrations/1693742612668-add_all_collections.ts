import { connectMongo } from "../../src/db/mongoose";
import { ArchitectModel } from "../../src/models/mongo/architect.model";
import architects from "../data/architects.json";
import { ArchitectureStyleModel } from "../../src/models/mongo/architectureStyle.model";
import architectureStyle from "../data/architectureStyle.json";
import { CityModel } from "../../src/models/mongo/city.model";
import cities from "../data/cities.json";
import { ContinentModel } from "../../src/models/mongo/continent.model";
import continents from "../data/continents.json";
import { CountryModel } from "../../src/models/mongo/country.model";
import countries from "../data/countries.json";
import { BlogModel } from "../../src/models/mongo/blog.model";
import blogs from "../data/dummy_data_blogs.json";
import { PostModel } from "../../src/models/mongo/post.model";
import posts from "../data/dummy_data_posts.json";

export async function up (): Promise<void> {
	await connectMongo();
	await ArchitectModel.create(architects);
	await ArchitectureStyleModel.create(architectureStyle);
	await ContinentModel.create(continents);
	await CountryModel.create(countries);
	await CityModel.create(cities);
	await BlogModel.create(blogs);
	await PostModel.create(posts);
}

export async function down (): Promise<void> {
	await connectMongo();
	await ArchitectModel.deleteMany({ firstName: { $in: architects.map(v => v.firstName) } }).exec();
	await ArchitectureStyleModel.deleteMany({ name: { $in: architectureStyle.map(v => v.name) } }).exec();
	await ContinentModel.deleteMany({ name: { $in: continents.map(v => v.name) } }).exec();
	await CountryModel.deleteMany({ name: { $in: countries.map(v => v.name) } }).exec();
	await CityModel.deleteMany({ name: { $in: cities.map(v => v.name) } }).exec();
	await BlogModel.deleteMany({ name: { $in: blogs.map(v => v.name) } }).exec();
	await PostModel.deleteMany({ name: { $in: posts.map(v => v.name) } }).exec();
}
