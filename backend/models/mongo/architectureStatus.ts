import mongoose from 'mongoose';
import Statuses from 'migration/data/architectureStatus.json';

const ArchitectureStatusSchema = new mongoose.Schema({
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

const ArchitectureStatus = mongoose.model('ArchitectureStatus', ArchitectureStatusSchema);
export default ArchitectureStatus;