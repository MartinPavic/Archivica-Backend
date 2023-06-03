import { IArchitectAttributes, ArchitectCreationAttributes } from "./interfaces";
import {
	Model,
	Sequelize,
	DataTypes,
} from "sequelize";

class Architect extends Model<IArchitectAttributes, ArchitectCreationAttributes> implements IArchitectAttributes {
    public id?: number;
    public firstName!: string;
    public lastName!: string;

    public static initialize(sequelize: Sequelize): void {
    	this.init({
    		id: {
    			autoIncrement: true,
    			type: DataTypes.INTEGER,
    			allowNull: false,
    			primaryKey: true,
    			field: "id",
    		},
    		firstName: { type: DataTypes.STRING, allowNull: false },
    		lastName: { type: DataTypes.STRING, allowNull: false },
    	}, {
    		sequelize,
    		tableName: "architects",
    		timestamps: false,
    		modelName: "architect",
    	});
    }
}

export default Architect;