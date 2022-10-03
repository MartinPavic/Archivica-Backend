import mongoose from 'mongoose';
import ArchitectureTypes from 'migration/data/architectureType.json';

const ArchitectureTypeSchema = new mongoose.Schema({
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

const ArchitectureType = mongoose.model('ArchitectureType', ArchitectureTypeSchema);
export default ArchitectureType;
