import { model, Document, Schema, Model } from "mongoose";
import Cities from "migration/data/cities.json";

export interface ICity extends Document {
    name: string;
    countryId: number;
    latitude: string;
    longitude: string;
}

const CitySchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: false,
	},
	countryId: { type: Number, unique: false },
	latitude: { type: String, unique: false },
	longitude: { type: String, unique: false },
});

CitySchema.statics.migrateCities = async function() {
	const count = await this.count();

	if (count === 0) {
		await this.insertMany(Cities);
	}

};

export interface CityModel extends Model<ICity> {
    migrateCities(): Promise<any>
}

export default model<ICity, CityModel>("City", CitySchema);
