import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { sendErrorResponse } from 'utils';
import { IRequest } from '../../../interfaces/express';
import _ from 'lodash';
import api from '../../../constants';
import authenticate from 'middleware/authenticate';

const Blog = require('../../../models/mongo/blog');
const router = Router();

router.post(api.BLOG_COMMENT, authenticate, async (req: IRequest, res) => {
    try {
        const comment = _.pick(req.body, [
            'blogId',
            'comment'
        ]);

        if (!ObjectId.isValid(comment.blogId)) {
            return res.status(404).send(`${comment.blogId} id is not valid mongoose ObjectId`);
        }
        const blog = await Blog.findByIdAndUpdate(
            { _id: comment.blogId },
            { $push: { comments: {
                owner: req.user._id,
                comment: comment.comment
            } } },
            { new: true }
        );

        if (!blog) {
            return res.status(404).send(`Blog with ${comment.blogId} id does not exist`);
        }
        res.send({
            success: true,
            _id: blog._id
        });
    } catch (ex) {
        sendErrorResponse(res, ex);
    }
});

router.patch(api.BLOG_COMMENT, authenticate, async (req: IRequest, res) => {
    try {
        const updateComment =  _.pick(req.body, [
            'blogId',
            'comment_id',
            'comment'
        ]);

        if (!ObjectId.isValid(updateComment.blogId)) {
            return res.status(404).send(`${updateComment.blogId} id is not valid mongoose ObjectId`);
        }

        const blog = await Blog.findById(updateComment.blogId);
        if (!blog) {
            return res.status(404).send(`Blog with ${updateComment.blogId} id does not exist`);
        }
        
        const comment = blog.comments.find((comment: any) => comment._id.toString() === updateComment.comment_id.toString());
        if (!comment) {
            return res.status(404).send(`Comment with ${updateComment.comment_id} id does not exist in blog with id ${updateComment.blogId}`);
        }
        if (comment.owner.toString() !== req.user._id.toString()) {
            return res.status(404).send(`Only creator of this comment can edit the comment`);
        };

        await Blog.updateOne(
            { _id: updateComment.blogId, "comments._id": updateComment.comment_id },
            {
                $set: {
                    "comments.$.comment": updateComment.comment
                 }
            }
        );

        res.send({
            success: true,
            _id: comment._id
        });
    } catch (ex) {
        sendErrorResponse(res, ex);
    }
});

router.delete(api.BLOG_COMMENT, authenticate, async (req: IRequest, res) => {
    try {
        const delComment =  _.pick(req.body, [
            'blogId',
            'comment_id'
        ]);

        if (!ObjectId.isValid(delComment.blogId)) {
            return res.status(404).send(`${delComment.blogId} id is not valid mongoose ObjectId`);
        }

        const blog = await Blog.findById(delComment.blogId);
        if (!blog) {
            return res.status(404).send(`Blog with ${delComment.blogId} id does not exist`);
        }
        
        const comment = blog.comments.find((comment: any) => comment._id.toString() === delComment.comment_id.toString());
        if (!comment) {
            return res.status(404).send(`Comment with ${delComment.comment_id} id does not exist in blog with id ${delComment.blogId}`);
        }
        if (comment.owner.toString() !== req.user._id.toString()) {
            return res.status(404).send(`Only creator of this comment can delete the comment`);
        };

        await Blog.updateOne(
            { _id: delComment.blogId },
            { $pull: { comments: { _id: delComment.comment_id } } } ,
            { new: true }
        );

        res.send({
            success: true,
            _id: comment._id
        });
    } catch (ex) {
        sendErrorResponse(res, ex);
    }
});

export default router;