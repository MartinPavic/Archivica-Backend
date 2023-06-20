import { model, Document, Schema, Model } from "mongoose";
import { CountryDomain } from "../domain/country";

type CountryDocument = CountryDomain & Document

const CountrySchema: Schema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true,
	},
	continentId: {
		type: Schema.Types.ObjectId,
		ref: "continents",
	},
});

// CountrySchema.statics.migrateCountries = async function() {
//     const count = await this.count();

//     if (count === 0) {
//         await this.insertMany(Counties);
//     }

// };

const CountryModel: Model<CountryDocument> = model<CountryDocument>("Country", CountrySchema);

export { CountryDocument, CountryModel };