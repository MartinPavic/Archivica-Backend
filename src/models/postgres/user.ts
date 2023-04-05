import {
	Model,
	Sequelize,
	DataTypes,
} from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { setUserToken, deleteUserToken } from "../../db/redis";
import { IUserAttributes, UserCreationAttributes } from "./interfaces";

class User extends Model<IUserAttributes, UserCreationAttributes> implements IUserAttributes {
    public id!: number;
    public name!: string;
    public lastname!: string;
    public email!: string;
    public password!: string;

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
    		lastname: { type: DataTypes.STRING, allowNull: false },
    		email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: { msg: "Email is not valid." } } },
    		password: { type: DataTypes.STRING, allowNull: true },
    	}, {
    		sequelize,
    		tableName: "users",
    		timestamps: false,
    		modelName: "user",
    		hooks: {
    			async beforeSave(user) {
    				if (user.changed("password")) {
    					await generateHashedPassword(user);
    				}
    			},
    		},
    	});
    }

    // Static methods
    // public static async findByToken(token: string): Promise<User | null> {
    //     let decodedUser;
    //     console.log("hereeeedfgdg");
    //     if (!token) {
    //         throw new Error("Missing token");
    //     }

    //     try {
    //         decodedUser = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as IJWTUser;
    //     } catch (ex) {
    //         throw new Error(ex);
    //     }

    //     const redisToken = await getUserToken(decodedUser._id);

    //     if (redisToken === token) {
    //         console.log("redisToken", decodedUser._id);
    //         const user = await User.findByPk(decodedUser._id);
    //         console.log("user", user);
    //         return user;
    //     }

    //     throw new Error("Missing token");
    // }

    public static async findByCredentials(email: string, password: string): Promise<User> {
    	const user = await User.findOne({ where: { email } });

    	if (user) {
    		return new Promise((resolve, reject) => {
    			bcrypt.compare(password, user.password, (err, found) => {
    				if (err) {
    					reject(err);
    				}

    				if (found === true) {
    					resolve(user);
    				}
    				reject(new Error("Unknown user"));
    			});
    		});
    	}

    	return Promise.reject(new Error("Unknown user"));
    }

    // Instance methods
    public async toJSON(): Promise<IUserAttributes> {
    	const values = Object.assign({}, this.get());
    	delete values.password;
    	return values;
    }

    public async generateAuthToken(): Promise<string> {
    	const access = "auth";
    	const token = jwt
    		.sign({ id: this.id, access }, process.env.JWT_SECRET as jwt.Secret)
    		.toString();

    	await setUserToken(this.id, Number(process.env.SESSION_EXPIRE_LOGIN), token);
    	return token;
    }

	// public async getAuthToken(): Promise<string | null> {
	//     const token = await getUserToken(this.id);
	//     return token;
	// }

	// public async removeAuthToken(): Promise<Error | null> {
	// 	console.log("this.id", this.id);
	// 	const result = await deleteUserToken(this.id);
	// 	return result;
	// }
}

export default User;

const generateHashedPassword = (user: User): Promise<User> => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				reject(err);
			}

			bcrypt.hash(user.password, salt, (hashErr, hash) => {
				if (hashErr) {
					reject(hashErr);
				}

				user.password = hash;
				resolve(user);
			});
		});
	});
};
