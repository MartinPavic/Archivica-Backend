import { BlogDomain } from "src/models/domain/blog";
import { BlogDocument } from "src/models/mongo/blog.model";
import { BlogRepository } from "src/repositories/blog.repository";
import { BaseController } from "./base.controller";

export class BlogController extends BaseController<BlogDocument, BlogDomain> {

    constructor(blogRepository: BlogRepository) {
        super(blogRepository);
    }

}