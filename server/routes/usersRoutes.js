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
} from '../controller/userController.js';

// router.options('*', cors, corsWithOptions, (req, res) => {
//   res.sendStatus(200);
// });
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

export default router;
