import { model, Document, Schema, Model } from "mongoose";
import DummyData from "migration/data/dummy_data_posts.json";

export interface IPost extends Document {
    name: string;
    date: Date;
    photoPath: string;
    description: string;
    architect: Schema.Types.ObjectId;
    city: Schema.Types.ObjectId;
    subAge: Schema.Types.ObjectId;
    owner: Schema.Types.ObjectId;
    gallery: [
        {
            name: string,
            imagePath: string,
            width: number,
            height: number
        }
    ];
    comments: [
        {
            owner: Schema.Types.ObjectId,
            comment: string
        }
    ];
    likes: [
        {
            owner: Schema.Types.ObjectId,
            liked: boolean
        }
    ];
}

const PostSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    photoPath: { type: String },
    description: { type: String },
    architect: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "architects"
    },
    city: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "cities"
    },
    subAge: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "subages"
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    gallery: [
        {
            name: { type: String },
            imagePath: { type: String },
            width: { type: Number },
            height: { type: Number }
        }
    ],
    comments: [
        {
            owner: { type: Schema.Types.ObjectId },
            comment: { type: String }
        }
    ],
    likes: [
        {
            owner: { type: Schema.Types.ObjectId },
            liked: { type: Boolean }
        }
    ]
});

PostSchema.statics.migrateDummyDataPosts = async function() {
    const count = await this.count();

    if (count === 0) {
        await this.insertMany(DummyData);
    }

};

PostSchema.statics.getAllPosts = async function() {
    const Posts = await this.aggregate([
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
                date: "$date",
                photoPath: "$photoPath",
                description: "$description",
                owner: {
                    firstName: "$owner.firstName",
                    lastName: "$owner.lastName"
                },
                "comment_count": { $size: "$comments" },
                "likes_count": {
                    "$size": {
                        "$filter": {
                            "input": "$likes",
                            "cond": "$$this.liked"
                        }
                    }
                },
                "dislikes_count": {
                    "$size": {
                        "$filter": {
                            "input": "$likes",
                            "cond": { $and: [
                                { $eq: ["$$this.liked", false] }
                            ] }
                        }
                    }
                }
            }
        }
    ]);

    return Posts;
};

PostSchema.statics.getPostById = async function(id) {
    const post = await this.aggregate([
        { "$match": { _id: new Schema.Types.ObjectId(id) } },
        {
            "$lookup": {
                "from": "architects",
                "localField": "architect",
                "foreignField": "_id",
                "as": "architect"
            }
        },
        {
            $unwind: "$architect"
        },
        {
            "$lookup": {
                "from": "cities",
                "localField": "city",
                "foreignField": "_id",
                "as": "city"
            }
        },
        {
            $unwind: "$city"
        },
        {
            "$lookup": {
                "from": "countries",
                "localField": "city.countryId",
                "foreignField": "id",
                "as": "country"
            }
        },
        {
            $unwind: "$country"
        },
        {
            "$lookup": {
                "from": "continents",
                "localField": "country.continentId",
                "foreignField": "id",
                "as": "continent"
            }
        },
        {
            $unwind: "$continent"
        },
        {
            "$lookup": {
                "from": "subages",
                "localField": "subAge",
                "foreignField": "_id",
                "as": "subAge"
            }
        },
        {
            $unwind: "$subAge"
        },
        {
            "$lookup": {
                "from": "ages",
                "localField": "subAge.ageId",
                "foreignField": "_id",
                "as": "age"
            }
        },
        {
            $unwind: "$age"
        },
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
                date: "$date",
                photoPath: "$photoPath",
                description: "$description",
                architect: "$architect",
                city: "$city.name",
                country: "$country.name",
                continent: "$continent.name",
                subAge: "$subAge.name",
                age: "$age.name",
                owner: {
                    firstName: "$owner.firstName",
                    lastName: "$owner.lastName"
                },
                gallery: "$gallery",
                comments: "$comments",
                likes: "$likes"
            }
        }
    ]);

    return post.shift();
};

export interface PostModel extends Model<IPost> {
    migrateDummyDataPosts(): Promise<any>
}

export default model<IPost, PostModel>("Post", PostSchema);