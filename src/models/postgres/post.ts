import { IPostAttributes, PostCreationAttributes } from "./interfaces";
import {
    Model,
    Sequelize,
    DataTypes
} from "sequelize";

class Post extends Model<IPostAttributes, PostCreationAttributes> implements IPostAttributes {
    public id?: number;
    public name: string;
    public date: Date;
    public photoPath: number;
    public description: string;
    public architectId: number;
    public cityId: number;
    public subAgeId: number;
    public ownerId: number;

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
            date: { type: DataTypes.DATE, allowNull: false },
            photoPath: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING, allowNull: false },
            architectId: { type: DataTypes.INTEGER, allowNull: false },
            cityId: { type: DataTypes.INTEGER, allowNull: false },
            subAgeId: { type: DataTypes.INTEGER, allowNull: false },
            ownerId: { type: DataTypes.INTEGER, allowNull: false }
        }, {
            sequelize,
            tableName: "posts",
            timestamps: false,
            modelName: "post"
        });
    }
}

export default Post;