import { model, Document, Schema, Model } from "mongoose";
// import Architects from "migration/data/architects.json";

export interface IArchitect extends Document {
    firstName: string;
    lastName: string;
}

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
	},
	yearEnd: {
		type: Number,
	},
	countryId: {
		type: Schema.Types.ObjectId,
	},
});

// ArchitectSchema.statics.migrateArchitects = async function() {
// 	const count = await this.count();

// 	if (count === 0) {
// 		await this.insertMany(Architects);
// 	}

// };

export interface ArchitectModel extends Model<IArchitect> {
    migrateArchitects(): Promise<any>
}

export default model<IArchitect, ArchitectModel>("Architect", ArchitectSchema);
