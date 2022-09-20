import { sequelizeClient } from 'postgres';

import Age from 'models/age';
import Continent from 'models/continent';
import Country from 'models/country';
import Image from 'models/image';
import SubAge from 'models/subAge';
import State from 'models/state';
import User from 'models/user';
import City from 'models/city';
import Architect from 'models/architect';
import ArchitectureStyle from 'models/architectureStyle';
import ArchitectureType from 'models/architectureType';
import Post from 'models/post';
import PostGallery from 'models/postGallery';
import PostComment from 'models/postComment';

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

Country.belongsTo(Continent, { foreignKey: 'continentId' });

Image.belongsTo(User, { foreignKey: 'ownerId' });

SubAge.belongsTo(Age);

State.belongsTo(Country, { foreignKey: 'countryId' });

City.belongsTo(Country, { foreignKey: 'countryId' });

Post.belongsTo(Architect, { foreignKey: 'architectId' });
Post.belongsTo(City, { foreignKey: 'cityId' });
Post.belongsTo(SubAge, { foreignKey: 'subAgeId' });
Post.belongsTo(User, { foreignKey: 'ownerId' });

PostGallery.belongsTo(Post, { foreignKey: 'postId' });

PostComment.belongsTo(User, { foreignKey: 'userId' });
PostComment.belongsTo(Post, { foreignKey: 'postId' });

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
