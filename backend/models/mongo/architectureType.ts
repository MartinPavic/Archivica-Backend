import { model, Document, Schema, Model } from "mongoose";
import ArchitectureTypes from "migration/data/architectureType.json";

export interface IArchitectureType extends Document {
    name: string;
}

const ArchitectureTypeSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
});

ArchitectureTypeSchema.statics.migrateArchitectureTypes = async function() {
    const count = await this.count();

    if (count === 0) {
        await this.insertMany(ArchitectureTypes);
    }

};

export interface ArchitectureTypeModel extends Model<IArchitectureType> {
    migrateArchitectureTypes(): Promise<any>
}

export default model<IArchitectureType, ArchitectureTypeModel>("ArchitectureType", ArchitectureTypeSchema);
