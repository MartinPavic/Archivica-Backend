import { BlogDocument } from "src/models/mongo/blog.model";
import { BaseRepository } from "./base.repository";

export class BlogRepository extends BaseRepository<BlogDocument> {}