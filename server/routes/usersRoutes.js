import express from 'express';
const router = express.Router();

import { verifyUser } from '../authenticate.js';

import {
  userRegisterController,
  userLoginController,
  userProfileUpdate,
  getUserProfile,
  updateUserCover,
  updateUserDp,
  getUserList,
  followOthers,
  unfollowOthers,
} from '../controller/userController.js';

//user register
router.route('/signup').post(userRegisterController);

//user login
router.route('/login').post(userLoginController);

// View user profile by anyone
router
  .route('/:username')
  .get(verifyUser, getUserProfile)
  .put(verifyUser, userProfileUpdate);

router.route('/:id/cover').put(verifyUser, updateUserCover);
router.route('/:id/dp').put(verifyUser, updateUserDp);

//Users List
router.route('/').get(verifyUser, getUserList);

//Follow Others
router.route('/:id/follow').put(verifyUser, followOthers);
router.route('/:id/unfollow').put(verifyUser, unfollowOthers);

export default router;
