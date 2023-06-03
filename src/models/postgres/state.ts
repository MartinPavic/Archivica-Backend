import { IStateAttributes, StateCreationAttributes } from "./interfaces";
import {
	Model,
	Sequelize,
	DataTypes,
} from "sequelize";

class State extends Model<IStateAttributes, StateCreationAttributes> implements IStateAttributes {
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
    		tableName: "states",
    		timestamps: false,
    		modelName: "state",
    	});
    }
}

export default State;
