import { model, Document, Schema, Model } from "mongoose";
import { ContinentDomain } from "../domain/continent";

type ContinentDocument = ContinentDomain & Document;

const ContinentSchema: Schema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

// ContinentSchema.statics.migrateContinents = async function() {
//     const count = await this.count();

//     if (count === 0) {
//         this.insertMany(Continents);
//     }

// };

const ContinentModel: Model<ContinentDocument> = model<ContinentDocument>("Continent", ContinentSchema);

export { ContinentDocument, ContinentModel };