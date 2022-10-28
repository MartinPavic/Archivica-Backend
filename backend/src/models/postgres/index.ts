import { sequelizeClient } from "src/db/postgres";

import Age from "src/models/postgres/age";
import Continent from "src/models/postgres/continent";
import Country from "src/models/postgres/country";
import Image from "src/models/postgres/image";
import SubAge from "src/models/postgres/subAge";
import State from "src/models/postgres/state";
import User from "src/models/postgres/user";
import City from "src/models/postgres/city";
import Architect from "src/models/postgres/architect";
import ArchitectureStyle from "src/models/postgres/architectureStyle";
import ArchitectureType from "src/models/postgres/architectureType";
import Post from "src/models/postgres/post";
import PostGallery from "src/models/postgres/postGallery";
import PostComment from "src/models/postgres/postComment";

Age.initialize(sequelizeClient);
Continent.initialize(sequelizeClient);
Country.initialize(sequelizeClient);
State.initialize(sequelizeClient);
City.initialize(sequelizeClient);
Image.initialize(sequelizeClient);
SubAge.initialize(sequelizeClient);
User.initialize(sequelizeClient);
Architect.initialize(sequelizeClient);
ArchitectureStyle.initialize(sequelizeClient);
ArchitectureType.initialize(sequelizeClient);
Post.initialize(sequelizeClient);
PostGallery.initialize(sequelizeClient);
PostComment.initialize(sequelizeClient);

Country.belongsTo(Continent, { foreignKey: "continentId" });

Image.belongsTo(User, { foreignKey: "ownerId" });

SubAge.belongsTo(Age);

State.belongsTo(Country, { foreignKey: "countryId" });

City.belongsTo(Country, { foreignKey: "countryId" });

Post.belongsTo(Architect, { foreignKey: "architectId" });
Post.belongsTo(City, { foreignKey: "cityId" });
Post.belongsTo(SubAge, { foreignKey: "subAgeId" });
Post.belongsTo(User, { foreignKey: "ownerId" });

PostGallery.belongsTo(Post, { foreignKey: "postId" });

PostComment.belongsTo(User, { foreignKey: "userId" });
PostComment.belongsTo(Post, { foreignKey: "postId" });

export {
    Age,
    Continent,
    Country,
    Image,
    SubAge,
    State,
    User,
    City,
    Architect,
    ArchitectureStyle,
    ArchitectureType,
    Post,
    PostGallery,
    PostComment
};
