import { IArchitectureTypeAttributes, ArchitectureTypeCreationAttributes } from 'interfaces/models';
import {
    Model,
    Sequelize,
    DataTypes
} from 'sequelize';

class ArchitectureType extends Model<IArchitectureTypeAttributes, ArchitectureTypeCreationAttributes> implements IArchitectureTypeAttributes {
    public id?: number;
    public name: string;

    public static initialize(sequelize: Sequelize): void {
        this.init({
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                field: 'id'
            },
            name: { type: DataTypes.STRING, allowNull: false }
        }, {
            sequelize,
            tableName: 'architectureTypes',
            timestamps: false,
            modelName: 'architectureType'
        });
    }
}

export default ArchitectureType;