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
  const { caption } = req.body;
  const creaePost = await Post.create({ caption, user: req.user });

  if (creaePost) {
    res.status(200);
    res.json(creaePost);
  } else {
    res.status(404);
    throw new Error();
  }
});

const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({createdAt: '-1'})
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

export { getUserPosts, fetchAllPost, postCreate };
