import Post from '../models/posts.js';
import asyncHandler from 'express-async-handler';
import _ from 'lodash';


// @ GET 
// @ fetch all posts
// @ public 
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

// @ POST 
// @ create a post by users
// @ public 
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

// @ GET 
// @ get specific user posts
// @ public 
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

// @ GET 
// @ get specific post
// @ public 
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

// @ DEL 
// @ delete post
// @ private 
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
// @ PUT 
// @ edit post
// @ private 
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

// @ PUT 
// @ give like to a post
// @ public 
const likePost = asyncHandler(async (req, res) => {  
  const post = await Post.findById(req.params.postId);
  if (post) {
    const newLike = {
      user: req.user._id
    }
    post.like.push(newLike);
     const updatedPost = await post.save()
     if(updatedPost){
      res.json({
        "status": "ok",
        "post": updatedPost
      })
     }else{
      res.status(403);
      throw new Error('Liked failed!');
     }
  } else {
    res.status(404);
    throw new Error('Post not found!');
  }
});
// @ PUT 
// @ unlike post
// @ public 
const unlikePost = asyncHandler(async (req, res) => {  
  const post = await Post.findById(req.params.postId);
  if (post) {
    const userIdx = _.findIndex(post.like, function (o) {
      return o.user === req.user._id;
    });

    post.like.splice(userIdx, 1);
   
     const updatedPost = await post.save()
     if(updatedPost){
      res.json({
        "status": "ok",
        "post": updatedPost
      })
     }else{
      res.status(403);
      throw new Error('Unliked failed!');
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
  likePost,
  unlikePost
};
