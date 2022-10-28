import { model, Document, Schema, Model } from "mongoose";
import Continents from "migration/data/continents.json";

export interface IContinent extends Document {
    id: number;
    name: string;
}

const ContinentSchema: Schema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

ContinentSchema.statics.migrateContinents = async function() {
    const count = await this.count();

    if (count === 0) {
        this.insertMany(Continents);
    }

};

export interface ContinentModel extends Model<IContinent> {
    migrateContinents(): Promise<any>
}

export default model<IContinent, ContinentModel>("Continent", ContinentSchema);
