import mongoose from 'mongoose';
import Ages from 'migration/data/ages.json';

const AgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

AgeSchema.statics.migrateAges = async function() {
    const Age = this;
    const count = await Age.count();

    if(count === 0) {
        await Age.insertMany(Ages);
    }

};

module.exports = mongoose.model('Age', AgeSchema);