import { ISubAgeAttributes, SubAgeCreationAttributes } from "./interfaces";
import {
    Model,
    Sequelize,
    DataTypes
} from "sequelize";

class SubAge extends Model<ISubAgeAttributes, SubAgeCreationAttributes> implements ISubAgeAttributes {
    public id?: number;
    public name: string;
    public ageId: number;

    public static initialize(sequelize: Sequelize): void {
        this.init({
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                field: "id"
            },
            name: { type: DataTypes.STRING, allowNull: false },
            ageId: { type: DataTypes.INTEGER, allowNull: false }
        }, {
            sequelize,
            tableName: "subAges",
            timestamps: false,
            modelName: "subAge"
        });
    }
}

export default SubAge;