import express from 'express';
import { verifyUser } from '../authenticate.js';
import { cors, corsWithOptions } from './cors.js';
import {
  fetchAllPost,
  postCreate,
  getUserPosts,
  userPostDelete,
  userPostEdit,
  getPostById,
} from '../controller/postController.js';
const router = express.Router();

router.route('/').get(verifyUser, fetchAllPost).post(verifyUser, postCreate);
router.route('/user/:userId').get(verifyUser, getUserPosts);
router
  .route('/:postId')
  .get(verifyUser, getPostById)
  .delete(verifyUser, userPostDelete)
  .put(verifyUser, userPostEdit);

export default router;
