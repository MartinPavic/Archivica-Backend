import { model, Document, Schema, Model } from "mongoose";
import { CityDomain } from "../domain/city";

type CityDocument = Document & CityDomain;

const CitySchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: false,
	},
	countryId: {
		type: Schema.Types.Number,
	},
	latitude: { type: String, required: true },
	longitude: { type: String, required: true },
});

// CitySchema.statics.migrateCities = async function() {
// 	const count = await this.count();

// 	if (count === 0) {
// 		await this.insertMany(Cities);
// 	}

// };

const CityModel: Model<CityDocument> = model<CityDocument>("City", CitySchema);

export { CityDocument, CityModel };