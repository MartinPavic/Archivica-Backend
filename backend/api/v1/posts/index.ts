import { Router } from 'express';
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { sendErrorResponse } from 'utils';
import { IRequest } from '../../../interfaces/express';
import api from '../../../constants';
import authenticate from 'middleware/authenticate';

const Post = require('../../../models/mongo/post');
const router = Router();

// Unauthenticated routes
router.get(api.POSTS, async (_req, res) => {
    try {
        const posts = await Post.getAllPosts();
        res.send(posts);
    } catch (ex) {
        sendErrorResponse(res, ex);
    }
});

router.get(api.POST + '/:id', async (req, res) => {
    try {

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(404).send(`${req.params.id} id is not valid mongoose ObjectId`);
        }

        const post = await Post.getPostById(req.params.id);
        if (!post) {
            return res.status(404).send(`Post with ${req.params.id} id does not exist`);
        }
        res.send(post);
    } catch (ex) {
        sendErrorResponse(res, ex);
    }
});

// Authenticated routes
router.post(api.POST, authenticate, async (req: IRequest, res) => {
    try {
        const newPost = await Post.create({
            owner: req.user._id,
            ...req.body
        });

        res.send({
            success: true,
            _id: newPost._id
        });
    } catch (ex) {
        sendErrorResponse(res, ex);
    }
});

router.patch(api.POST, authenticate, async (req: IRequest, res) => {
    try {
        const updatedPost = _.pick(req.body, [
            '_id',
            'name',
            'photoPath',
            'description',
            'architect',
            'city',
            'subAge',
            'gallery'
        ]);

        if (!ObjectId.isValid(updatedPost._id)) {
            return res.status(404).send(`${updatedPost._id} id is not valid mongoose ObjectId`);
        }
        const post = await Post.findById(updatedPost._id);

        if (!post) {
            return res.status(404).send(`Post with ${updatedPost._id} id does not exist`);
        }

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(404).send(`Only creator of this post can edit the post`);
        }

        await Post.findByIdAndUpdate(
            { _id: updatedPost._id },
            updatedPost,
            { new: true }
        );

        res.send({
            success: true,
            _id: post._id
        });
    } catch (ex) {
        sendErrorResponse(res, ex);
    }
});

router.delete(api.POST + '/:id', authenticate, async (req: IRequest, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(404).send(`${id} id is not valid mongoose ObjectId`);
        }
        
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send(`Post with ${id} id does not exist`);
        }

        if(post.owner.toString() !== req.user._id.toString()) {
            return res.status(404).send(`Only creator of this post can delete the post`);
        }

        await Post.findByIdAndRemove(id);
        res.send({
            success: true,
            _id: post._id
        });
    } catch (ex) {
        sendErrorResponse(res, ex);
    }
});

export default router;