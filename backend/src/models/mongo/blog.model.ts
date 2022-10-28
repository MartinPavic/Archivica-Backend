import { model, Schema, Model, Document, Types } from "mongoose";
import DummyData from "migration/data/dummy_data_blogs.json";

export interface IBlog extends Document {
    name: string;
    description: string;
    photoPath: string;
    readingTime: {
        duration: number;
        unit: string;
    };
    date: Date;
    owner: Schema.Types.ObjectId;
    comments: [
        {
            owner: Schema.Types.ObjectId;
            comment: string;
            date: Date;
        }
    ];
    likes: [
        {
            owner: Schema.Types.ObjectId;
            liked: boolean;
            date: Date;
        }
    ];
    gallery: [
        {
            name: string;
            imagePath: string;
            width: number,
            height: number
        }
    ];
    connectedPosts: [
        {
            post: Schema.Types.ObjectId
        }
    ]
}

const BlogSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: { type: String },
    photoPath: { type: String },
    readingTime: {
        duration: { type: Number },
        unit: { type: String }
    },
    date: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    comments: [
        {
            owner: { type: Schema.Types.ObjectId },
            comment: { type: String },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    likes: [
        {
            owner: { type: Schema.Types.ObjectId },
            liked: { type: Boolean },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    gallery: [
        {
            name: { type: String },
            imagePath: { type: String },
            width: { type: Number },
            height: { type: Number }
        }
    ],
    connectedPosts: [
        { post: { type: Schema.Types.ObjectId } }
    ]
});

BlogSchema.statics.migrateDummyDataBlogs = async function() {
    const count = await this.count();

    if (count === 0) {
        await this.insertMany(DummyData);
    }

};

BlogSchema.statics.getAllBlogs = async function() {
    const Blogs = await this.aggregate([
        {
            "$lookup": {
                "from": "users",
                "localField": "owner",
                "foreignField": "_id",
                "as": "owner"
            }
        },
        {
            $unwind: "$owner"
        },
        {
            $project: {
                name: "$name",
                description: "$description",
                photoPath: "$photoPath",
                readingTime: "$readingTime",
                date: "$date",
                owner: {
                    firstName: "$owner.firstName",
                    lastName: "$owner.lastName"
                }
            }
        }
    ]);

    return Blogs;
};

BlogSchema.statics.getBlogById = async function(id: Types.ObjectId) {
    const blog = await this.aggregate([
        { "$match": { _id: new Types.ObjectId(id) } },
        {
            "$lookup": {
                "from": "users",
                "localField": "owner",
                "foreignField": "_id",
                "as": "owner"
            }
        },
        {
            $unwind: "$owner"
        },
        {
            "$lookup": {
                "from": "posts",
                "let": { "pid": "$connectedPosts.post" },
                "pipeline": [
                    { "$match": { "$expr": { "$in": ["$_id", "$$pid"] } } }
                ],
                "as": "connectedPosts"
            }
        },
        {
            "$lookup": {
                "from": "users",
                "let": { "pid": "$comments.owner" },
                "pipeline": [
                    { "$match": { "$expr": { "$in": ["$_id", "$$pid"] } } }
                ],
                "as": "lookupComments"
            }
        },
        {
            "$addFields": {
                "comments": {
                    "$map": {
                        "input": "$comments",
                        "as": "rel",
                        "in": {
                            "$mergeObjects": [
                                "$$rel",
                                {
                                    "firstName": { "$arrayElemAt": ["$lookupComments.firstName", { "$indexOfArray": ["$lookupComments._id", "$$rel._id"] }] },
                                    "lastName": { "$arrayElemAt": ["$lookupComments.lastName", { "$indexOfArray": ["$lookupComments._id", "$$rel._id"] }] }
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            "$lookup": {
                "from": "users",
                "let": { "pid": "$likes.owner" },
                "pipeline": [
                    { "$match": { "$expr": { "$in": ["$_id", "$$pid"] } } }
                ],
                "as": "lookupLikes"
            }
        },
        {
            "$addFields": {
                "likes": {
                    "$map": {
                        "input": "$likes",
                        "as": "rel",
                        "in": {
                            "$mergeObjects": [
                                "$$rel",
                                {
                                    "firstName": { "$arrayElemAt": ["$lookupLikes.firstName", { "$indexOfArray": ["$lookupLikes._id", "$$rel._id"] }] },
                                    "lastName": { "$arrayElemAt": ["$lookupLikes.lastName", { "$indexOfArray": ["$lookupLikes._id", "$$rel._id"] }] }
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            $project: {
                name: "$name",
                description: "$description",
                photoPath: "$photoPath",
                readingTime: "$readingTime",
                date: "$date",
                owner: {
                    firstName: "$owner.firstName",
                    lastName: "$owner.lastName"
                },
                comments: "$comments",
                likes: "$likes",
                connectedPosts: {
                    "$map": {
                        "input": "$connectedPosts",
                        "as": "post",
                        "in": {
                            "id": "$$post._id",
                            "name": "$$post.name"
                        }
                    }
                },
                gallery: "$gallery"
            }
        }
    ]);

    return blog.shift();
};

export interface BlogModel extends Model<IBlog> {
    migrateDummyDataBlogs(): Promise<any>
    getAllBlogs(): Promise<any[]>
    getBlogById(id: Types.ObjectId): Promise<any>
}

export default model<IBlog, BlogModel>("Blog", BlogSchema);
