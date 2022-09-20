import mongoose from 'mongoose';
import ArchitectureStyles from 'migration/data/architectureStyle.json';

const ArchitectureStyleSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
});

ArchitectureStyleSchema.statics.migrateArchitectureStyles = async function() {
    const ArchitectureStyle = this;
    const count = await ArchitectureStyle.count();

    if(count === 0) {
        await ArchitectureStyle.insertMany(ArchitectureStyles);
    }

};

module.exports = mongoose.model('ArchitectureStyle', ArchitectureStyleSchema);