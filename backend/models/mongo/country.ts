import mongoose from 'mongoose';
import Counties from 'migration/data/countries.json';

const CountrySchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    continentId: {
        type: Number
    },
});

CountrySchema.statics.migrateCountries = async function() {
    const Country = this;
    const count = await Country.count();

    if(count === 0) {
        Counties.forEach(async (country: any) => {
            const newCountry = new Country();
            newCountry.id = country.id;
            newCountry.name = country.name;
            newCountry.continentId = country.continentId;
            await newCountry.save();
        });
    }

};

module.exports = mongoose.model('Country', CountrySchema);