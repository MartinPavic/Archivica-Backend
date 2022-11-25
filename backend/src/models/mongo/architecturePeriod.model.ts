import { model, Document, Schema, Model } from "mongoose";
import { ArchitecturePeriodDomain } from "../domain/architecturePeriod";

type ArchitecturePeriodDocument = ArchitecturePeriodDomain & Document

const ArchitecturePeriodSchema: Schema = new Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: Schema.Types.String,
        trim: true,
        required: true
    },
    synonyms: {
        type: Schema.Types.Array
    },
    start: {
        year: { type: Schema.Types.Number },
        unit: { type: Schema.Types.String, enum: ["AD", "BC"] }
    },
    end: {
        year: { type: Schema.Types.Number },
        unit: { type: Schema.Types.String, enum: ["AD", "BC"] }
    },
    stillActive: {
        type: Schema.Types.Boolean
    }
});

// PeriodSchema.statics.migratePeriods = async function() {
//     const count = await this.count();

//     if (count === 0) {
//         await this.insertMany(Periods);
//     }

// };

const ArchitecturePeriodModel: Model<ArchitecturePeriodDocument> = model<ArchitecturePeriodDocument>("ArchitecturePeriod", ArchitecturePeriodSchema);

export { ArchitecturePeriodDocument, ArchitecturePeriodModel };
