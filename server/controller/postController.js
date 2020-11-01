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
    .find({ user: req.params.userId });

  if (posts) {
    res.status(200);
    res.json(posts);
  } else {
    res.status(404);
    throw new Error('No posts found!');
  }
});

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId).populate('user');
  if (post) {
    res.status(200);
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found!');
  }
});

const userPostDelete = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (post) {
    if (post.user.equals(req.user._id)) {
      await Post.findByIdAndRemove(req.params.postId);
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

const userPostEdit = asyncHandler(async (req, res) => {
  const { caption, image } = req.body;
  const post = await Post.findById(req.params.postId);
  if (post) {
    if (post.user.equals(req.user._id)) {
      post.caption = caption;
      post.image = image;
      const updatedPost = await post.save();
      res.status(201).json(updatedPost);
    } else {
      res.status(401);
      throw new Error('You are not authorized to edit this post!');
    }
  } else {
    res.status(404);
    throw new Error('Post not found!');
  }
});

export {
  getUserPosts,
  fetchAllPost,
  postCreate,
  userPostDelete,
  userPostEdit,
  getPostById,
};
