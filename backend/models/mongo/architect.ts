import mongoose from 'mongoose';
import Architects from 'migration/data/architects.json';

const ArchitectSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    }
});

ArchitectSchema.statics.migrateArchitects = async function() {
    const count = await this.count();

    if (count === 0) {
        await this.insertMany(Architects);
    }

};

const Architect = mongoose.model('Architect', ArchitectSchema);
export default Architect;
