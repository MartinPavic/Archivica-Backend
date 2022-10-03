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
    const count = await this.count();

    if (count === 0) {
        await this.insertMany(ArchitectureStyles);
    }

};

const ArchitectureStyle = mongoose.model('ArchitectureStyle', ArchitectureStyleSchema);
export default ArchitectureStyle;
