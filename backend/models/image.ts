import { IImageAttributes, ImageCreationAttributes } from 'interfaces/models';
import {
    Model,
    Sequelize,
    DataTypes
} from 'sequelize';

class Image extends Model<IImageAttributes, ImageCreationAttributes> implements IImageAttributes {
    public id?: number;
    public path: string;
    public width?: number;
    public height?: number;
    public name?: string;
    public ownerId: number;

    public static initialize(sequelize: Sequelize): void {
        this.init({
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                field: 'id'
            },
            path: { type: DataTypes.STRING, allowNull: false },
            width: { type: DataTypes.INTEGER, allowNull: true },
            height: { type: DataTypes.INTEGER, allowNull: true },
            name: { type: DataTypes.STRING, allowNull: true },
            ownerId: { type: DataTypes.INTEGER, allowNull: true }
        }, {
            sequelize,
            tableName: 'images',
            timestamps: false,
            modelName: 'image'
        });
    }
}

export default Image;