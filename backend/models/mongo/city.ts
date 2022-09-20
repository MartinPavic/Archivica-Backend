import mongoose from 'mongoose';
import Cities from 'migration/data/cities.json';

const CitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    countryId: { type: Number, unique: false },
    latitude: { type: String, unique: false },
    longitude: { type: String, unique: false }
});

CitySchema.statics.migrateCities = async function() {
    const City = this;
    const count = await City.count();

    if(count === 0) {
        await City.insertMany(Cities);
    }

};

module.exports = mongoose.model('City', CitySchema);