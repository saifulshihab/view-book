import Post from '../models/posts.js';
import asyncHandler from 'express-async-handler';

const fetchAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: '-1' }).populate('user');
  if (posts) {
    res.status(200);
    res.json(posts);
  } else {
    res.status(404);
    throw new Error('Posts not Found!');
  }
});

const postCreate = asyncHandler(async (req, res) => {
  const { caption, image } = req.body;
  const creaePost = await Post.create({ caption, image, user: req.user });

  if (creaePost) {
    res.status(200);
    res.json(creaePost);
  } else {
    res.status(404);
    throw new Error();
  }
});

const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .sort({ createdAt: '-1' })
    .populate('user')
    .find({ user: req.params.id });

  if (posts) {
    res.status(200);
    res.json(posts);
  } else {
    res.status(404);
    throw new Error('No posts found!');
  }
});

const userPostDelete = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    if (post.user.equals(req.user._id)) {
      await Post.findByIdAndRemove(req.params.id);
      res.status(200);
      res.json(post);
    } else {
      res.status(401);
      throw new Error('You are not authorized to delete this post!');
    }
  } else {
    res.status(404);
    throw new Error('Post not found!');
  }
});

export { getUserPosts, fetchAllPost, postCreate, userPostDelete };
