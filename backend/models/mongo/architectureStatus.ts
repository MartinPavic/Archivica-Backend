import { model, Document, Schema, Model } from 'mongoose';
import Statuses from 'migration/data/architectureStatus.json';

export interface IArchitectureStatus extends Document {
    name: string;
}

const ArchitectureStatusSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

ArchitectureStatusSchema.statics.migrateStatuses = async function() {
    const count = await this.count();

    if (count === 0) {
        await this.insertMany(Statuses);
    }
};

export interface ArchitectureStatusModel extends Model<IArchitectureStatus> {
    migrateStatuses(): Promise<any>
}

export default model<IArchitectureStatus, ArchitectureStatusModel>("ArchitectureStatus", ArchitectureStatusSchema);
