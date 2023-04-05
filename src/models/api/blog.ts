import { BlogDomain } from "../domain/blog";
import { BlogDocument } from "../mongo/blog.model";

export type CreateBlogInput = BlogDomain

export type CreateBlogOutput = BlogDocument

export type UpdateBlogInput = BlogDomain

export type UpdateBlogOutput = BlogDocument

export type BlogCommentInput = {
    comment: string
}

export type CreateBlogCommentOutput = string

export type UpdateBlogCommentOutput = string

export type BlogLikeInput = {
    like: boolean
}