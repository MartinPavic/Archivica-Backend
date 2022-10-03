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
    const count = await this.count();

    if (count === 0) {
        await this.insertMany(Cities);
    }

};

const City = mongoose.model('City', CitySchema);
export default City;
