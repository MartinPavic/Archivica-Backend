import { PostDomain } from "src/models/domain/post";
import { PostDocument } from "src/models/mongo/post.model";
import { PostRepository } from "src/repositories/post.repository";
import { BaseController } from "./base.controller";

export class PostController extends BaseController<PostDocument, PostDomain> {

    constructor(postRepository: PostRepository) {
        super(postRepository);
    }

}