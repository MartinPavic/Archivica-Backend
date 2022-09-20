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
    const ArchitectureType = this;
    const count = await ArchitectureType.count();

    if(count === 0) {
        await ArchitectureType.insertMany(ArchitectureTypes);
    }

};

module.exports = mongoose.model('ArchitectureType', ArchitectureTypeSchema);