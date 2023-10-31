import { ICityAttributes, CityCreationAttributes } from "./interfaces";
import {
	Model,
	Sequelize,
	DataTypes,
} from "sequelize";

class City extends Model<ICityAttributes, CityCreationAttributes> implements ICityAttributes {
    public id?: number;
    public name!: string;
    public countryId!: number;
    public latitude!: number;
    public longitude!: number;

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
    		countryId: { type: DataTypes.INTEGER, allowNull: false },
    		latitude: { type: DataTypes.DOUBLE, allowNull: true },
    		longitude: { type: DataTypes.DOUBLE, allowNull: true },
    	}, {
    		sequelize,
    		tableName: "cities",
    		timestamps: false,
    		modelName: "city",
    	});
    }
}

export default City;
