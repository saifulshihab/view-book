import express from 'express';
import { verifyUser } from '../authenticate.js';
import { cors, corsWithOptions } from './cors.js';
import {
  fetchAllPost,
  postCreate,
  getUserPosts,
} from '../controller/postController.js';
const router = express.Router();

// router.options('*', cors.corsWithOptions, (req, res) => {
//   res.sendStatus(200);
// });

router.route('/').get(verifyUser, fetchAllPost).post(verifyUser, postCreate);

router.route('/:id').get(verifyUser, getUserPosts);

export default router;
