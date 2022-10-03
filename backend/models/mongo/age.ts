import mongoose from 'mongoose';
import Ages from 'migration/data/ages.json';

const AgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

AgeSchema.statics.migrateAges = async function() {
    const count = await this.count();

    if (count === 0) {
        await this.insertMany(Ages);
    }

};

const Age = mongoose.model('Age', AgeSchema);

export default Age;
