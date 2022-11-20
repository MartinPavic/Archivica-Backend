import { BlogDomain } from "../domain/blog";
import { BlogDocument } from "../mongo/blog.model";

export type CreateBlogInput = BlogDomain

export type CreateBlogOutput = BlogDocument

export type UpdateBlogInput = BlogDomain

export type UpdateBlogOutput = BlogDocument