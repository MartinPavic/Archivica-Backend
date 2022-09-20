import { IArchitectureStyleAttributes, ArchitectureStyleCreationAttributes } from 'interfaces/models';
import {
    Model,
    Sequelize,
    DataTypes
} from 'sequelize';

class ArchitectureStyle extends Model<IArchitectureStyleAttributes, ArchitectureStyleCreationAttributes> implements IArchitectureStyleAttributes {
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
            tableName: 'architectureStyles',
            timestamps: false,
            modelName: 'architectureStyle'
        });
    }
}

export default ArchitectureStyle;