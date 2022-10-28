import { model, Document, Schema, Model } from "mongoose";
import ArchitectureStyles from "migration/data/architectureStyle.json";

export interface IArchitectureStyle extends Document {
    name: string
}

const ArchitectureStyleSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
});

ArchitectureStyleSchema.statics.migrateArchitectureStyles = async function() {
    const count = await this.count();

    if (count === 0) {
        await this.insertMany(ArchitectureStyles);
    }

};

export interface ArchitectureStyleModel extends Model<IArchitectureStyle> {
    migrateArchitectureStyles(): Promise<any>
}

export default model<IArchitectureStyle, ArchitectureStyleModel>("ArchitectureStyle", ArchitectureStyleSchema);
