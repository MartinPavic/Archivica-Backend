import { PostDocument } from "src/models/mongo/post.model";
import { BaseRepository } from "./base.repository";

export class PostRepository extends BaseRepository<PostDocument> {}