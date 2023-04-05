import { model, Document, Schema, Model } from "mongoose";
import Ages from "migration/data/ages.json";

export interface IAge extends Document {
    name: string;
}

const AgeSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

AgeSchema.statics.migrateAges = async function() {
    const count = await this.count();

    if (count === 0) {
        await this.insertMany(Ages);
    }

};

export interface AgeModel extends Model<IAge> {
    migrateAges(): Promise<any>
}

export default model<IAge, AgeModel>("Age", AgeSchema);
