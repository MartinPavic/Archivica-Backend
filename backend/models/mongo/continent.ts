import mongoose from 'mongoose';
import Continents from 'migration/data/continents.json';

const ContinentSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

ContinentSchema.statics.migrateContinents = async function() {
    const Continent = this;
    const count = await Continent.count();

    if(count === 0) {
        Continent.insertMany(Continents);
    }

};

module.exports = mongoose.model('Continent', ContinentSchema);