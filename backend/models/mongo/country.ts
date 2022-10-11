import { model, Document, Schema, Model } from "mongoose";
import Counties from "migration/data/countries.json";

export interface ICountry extends Document {
    id: number;
    name: string;
    continentId: number;
}

const CountrySchema: Schema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    continentId: {
        type: Number
    }
});

CountrySchema.statics.migrateCountries = async function() {
    const count = await this.count();

    if (count === 0) {
        await this.insertMany(Counties);
    }

};

export interface CountryModel extends Model<ICountry> {
    migrateCountries(): Promise<any>
}

export default model<ICountry, CountryModel>("Country", CountrySchema);
