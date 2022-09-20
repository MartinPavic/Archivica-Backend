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
    const Architect = this;
    const count = await Architect.count();

    if(count === 0) {
        await Architect.insertMany(Architects);
    }

};

module.exports = mongoose.model('Architect', ArchitectSchema);