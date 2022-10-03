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
    const count = await this.count();

    if (count === 0) {
        this.insertMany(Continents);
    }

};

const Continent = mongoose.model('Continent', ContinentSchema);
export default Continent;
