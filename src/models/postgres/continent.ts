import { IContinentAttributes, ContinentCreationAttributes } from "./interfaces";
import {
	Model,
	Sequelize,
	DataTypes,
} from "sequelize";

class Continent extends Model<IContinentAttributes, ContinentCreationAttributes> implements IContinentAttributes {
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
    		tableName: "continents",
    		timestamps: false,
    		modelName: "continent",
    	});
    }
}

export default Continent;