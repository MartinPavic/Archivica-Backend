import { PostDomain } from "../domain/post";
import { PostDocument } from "../mongo/post.model";

export type GetAllOutput = PostDomain[]

export type GetByIdOutput = PostDomain

export type CreatePostInput = PostDomain

export type CreatePostOutput = PostDocument

export type UpdatePostInput = PostDomain

export type UpdatePostOutput = PostDocument