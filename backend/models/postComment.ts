import { IPostCommentsAttributes, PostCommentsCreationAttributes } from 'interfaces/models';
import {
    Model,
    Sequelize,
    DataTypes
} from 'sequelize';

class PostComment extends Model<IPostCommentsAttributes, PostCommentsCreationAttributes> implements IPostCommentsAttributes {
    public id?: number;
    public comment: string;
    public userId: number;
    public postId: number;

    public static initialize(sequelize: Sequelize): void {
        this.init({
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                field: 'id'
            },
            comment: { type: DataTypes.STRING, allowNull: false },
            userId: { type: DataTypes.INTEGER, allowNull: false },
            postId: { type: DataTypes.INTEGER, allowNull: false }
        }, {
            sequelize,
            tableName: 'postComments',
            timestamps: false,
            modelName: 'postComment'
        });
    }
}

export default PostComment;