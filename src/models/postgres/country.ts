import { ICountryAttributes, CountryCreationAttributes } from "./interfaces";
import {
	Model,
	Sequelize,
	DataTypes,
} from "sequelize";

class Country extends Model<ICountryAttributes, CountryCreationAttributes> implements ICountryAttributes {
    public id?: number;
    public name!: string;
    public continentId!: number;

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
    		continentId: { type: DataTypes.INTEGER, allowNull: false },
    	}, {
    		sequelize,
    		tableName: "countries",
    		timestamps: false,
    		modelName: "country",
    	});
    }
}

export default Country;