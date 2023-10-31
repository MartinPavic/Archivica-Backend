import { IPostGalleryAttributes, PostGalleryCreationAttributes } from "./interfaces";
import {
	Model,
	Sequelize,
	DataTypes,
} from "sequelize";

class PostGallery extends Model<IPostGalleryAttributes, PostGalleryCreationAttributes> implements IPostGalleryAttributes {
    public id?: number;
    public path!: string;
    public width?: number;
    public height?: number;
    public name?: string;
    public postId!: number;

    public static initialize(sequelize: Sequelize): void {
    	this.init({
    		id: {
    			autoIncrement: true,
    			type: DataTypes.INTEGER,
    			allowNull: false,
    			primaryKey: true,
    			field: "id",
    		},
    		path: { type: DataTypes.STRING, allowNull: false },
    		width: { type: DataTypes.INTEGER, allowNull: true },
    		height: { type: DataTypes.INTEGER, allowNull: true },
    		name: { type: DataTypes.STRING, allowNull: true },
    		postId: { type: DataTypes.INTEGER, allowNull: true },
    	}, {
    		sequelize,
    		tableName: "postGallery",
    		timestamps: false,
    		modelName: "postGallery",
    	});
    }
}

export default PostGallery;