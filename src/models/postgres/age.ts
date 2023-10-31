import { IAgeAttributes, AgeCreationAttributes } from "./interfaces";
import {
	Model,
	Sequelize,
	DataTypes,
} from "sequelize";

class Age extends Model<IAgeAttributes, AgeCreationAttributes> implements IAgeAttributes {
    public id?: number;
    public name!: string;

    public static initialize(sequelize: Sequelize): void {
    	this.init({
    		id: {
    			autoIncrement: true,
    			type: DataTypes.INTEGER,
    			allowNull: false,
    			primaryKey: true,
    			field: "id",
    		},
    		name: { type: DataTypes.STRING, allowNull: false },
    	}, {
    		sequelize,
    		tableName: "ages",
    		timestamps: false,
    		modelName: "age",
    	});
    }
}

export default Age;