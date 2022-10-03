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
    }
});

CountrySchema.statics.migrateCountries = async function() {
    const count = await this.count();

    if (count === 0) {
        Counties.forEach(async (country: any) => {
            const newCountry = new Country();
            newCountry.id = country.id;
            newCountry.name = country.name;
            newCountry.continentId = country.continentId;
            await newCountry.save();
        });
    }

};

const Country = mongoose.model('Country', CountrySchema);
export default Country;
