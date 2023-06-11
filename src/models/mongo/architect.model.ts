import { model, Document, Schema, Model } from "mongoose";
import { ArchitectDomain } from "../domain/architect";
// import Architects from "migration/data/architects.json";

type ArchitectDocument = Document & ArchitectDomain

const ArchitectSchema: Schema = new Schema({
	firstName: {
		type: String,
		trim: true,
		required: true,
	},
	lastName: {
		type: String,
		trim: true,
		required: true,
	},
	yearBorn: {
		type: Number,
		required: false,
	},
	yearDied: {
		type: Number,
		required: false,
	},
	countryId: {
		type: Schema.Types.ObjectId,
		ref: "countries",
	},
});

// ArchitectSchema.statics.migrateArchitects = async function() {
// 	const count = await this.count();

// 	if (count === 0) {
// 		await this.insertMany(Architects);
// 	}

// };

const ArchitectModel: Model<ArchitectDocument> = model<ArchitectDocument>("Architect", ArchitectSchema);

export { ArchitectDocument, ArchitectModel };
