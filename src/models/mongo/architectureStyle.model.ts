import { model, Document, Schema, Model } from "mongoose";
import { ArchitectureStyleDomain } from "../domain/architectureStyle";

type ArchitectureStyleDocument = ArchitectureStyleDomain & Document

const ArchitectureStyleSchema: Schema = new Schema({
	name: {
		type: Schema.Types.String,
		trim: true,
		required: true,
	},
	synonyms: {
		type: Schema.Types.Array,
	},
	start: {
		year: { type: Schema.Types.Number },
		unit: { type: Schema.Types.String, enum: ["AD", "BC"] },
	},
	end: {
		year: { type: Schema.Types.Number },
		unit: { type: Schema.Types.String, enum: ["AD", "BC"] },
	},
	stillActive: {
		type: Schema.Types.Boolean,
	},
});

// ArchitectureStyleSchema.statics.migrateArchitectureStyles = async function() {
//     const count = await this.count();

//     if (count === 0) {
//         await this.insertMany(ArchitectureStyles);
//     }

// };

const ArchitectureStyleModel: Model<ArchitectureStyleDocument> = model<ArchitectureStyleDocument>("ArchitectureStyle", ArchitectureStyleSchema);

export { ArchitectureStyleDocument, ArchitectureStyleModel };
