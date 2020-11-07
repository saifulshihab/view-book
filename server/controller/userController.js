import passport from 'passport';
import User from '../models/users.js';
import asyncHandler from 'express-async-handler';
import { getToken } from '../authenticate.js';
import _ from 'lodash';

const userRegisterController = (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      } else {
        if (req.body.fullname) user.full_name = req.body.fullname;
        if (req.body.email) user.email = req.body.email;
        if (req.body.gender) user.gender = req.body.gender;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
              success: true,
              status: 'Registration Successfull!',
              /* user: user, */
            });
          });
        });
      }
    }
  );
};

const userLoginController = asyncHandler(async (req, res) => {
  await passport.authenticate('local', (error, user, info) => {
    if (error) throw error;

    if (!user) {
      res.status(401);
      res.json({ success: false, status: 'Login Unsuccessful!', error: info });
    }
    req.logIn(user, (error) => {
      if (error) {
        res.status(401);
        res.json({
          success: false,
          status: 'Login Unsuccessful!',
          error: 'Could not log in user!',
        });
      }
      const token = getToken({ _id: req.user._id });
      res.status(200);
      res.json({
        _id: user._id,
        username: user.username,
        token: token,
      });
    });
  })(req, res);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (user) {
    res.status(200);
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not Found!');
  }
});

const userProfileUpdate = asyncHandler(async (req, res) => {
  //check curent user is valid
  const user = await User.findOne({ username: req.params.username });
  if (user) {
    if (req.user._id.equals(user._id)) {
      const updateduser = await User.findByIdAndUpdate(
        req.user._id,
        { $set: req.body },
        { new: true }
      );
      if (updateduser) {
        res.status(200);
        res.json({
          success: true,
          status: 'Prfoile is Updated!',
        });
      } else {
        throw new Error();
      }
    } else {
      res.status(400);
      throw new Error('You are not authorized to edit this!');
    }
  } else {
    res.status(404);
    throw new Error('User Not Found!');
  }
});

const updateUserCover = asyncHandler(async (req, res) => {
  const { cover } = req.body;
  const user = await User.findById(req.params.id);
  if (user) {
    user.cover = cover || user.cover;
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not Found!');
  }
});

const updateUserDp = asyncHandler(async (req, res) => {
  const { dp } = req.body;
  const user = await User.findById(req.params.id);
  if (user) {
    user.dp = dp || user.dp;
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not Found!');
  }
});

const getUserList = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200);
    res.json(users);
  } else {
    res.status(404);
    throw new Error('User not Found!');
  }
});

const followOthers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const reqUser = await User.findById(req.user._id);

  if (user) {
    if (reqUser._id.equals(user._id)) {
      res.status(404);
      throw new Error('You can not follow yourself!');
    } else {
      let follow = false;
      user.followers.map((x) => {
        if (x.userId.toString() === reqUser._id.toString()) {
          follow = true;
        }
      });

      if (follow === true) {
        res.status(404);
        throw new Error('You are already following this person!');
      } else {
        reqUser.following.push({
          userId: user._id,
          username: user.username,
          full_name: user.full_name,
          dp: user.dp,
        });
        reqUser.save();

        user.followers.push({
          userId: reqUser._id,
          username: reqUser.username,
          full_name: reqUser.full_name,
          dp: reqUser.dp,
        });

        await user.save();

        res.status(200);
        res.json({
          status: 'ok',
          message: `You are following ${user.full_name}`,
        });
      }
    }
  } else {
    res.status(404);
    throw new Error('User not Found!');
  }
});

const unfollowOthers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const reqUser = await User.findById(req.user._id);

  if (user) {
    const reqUserIdx = _.findIndex(reqUser.following, function (o) {
      return o.userId === req.params.id;
    });
    const userUserIdx = _.findIndex(user.followers, function (o) {
      return o.userId === req.user._id;
    });

    reqUser.following.splice(reqUserIdx, 1);

    user.followers.splice(userUserIdx, 1);

    await reqUser.save();
    await user.save();

    res.status(200);
    res.json(reqUser);
  } else {
    res.status(404);
    throw new Error('User not Found!');
  }
});

export {
  updateUserCover,
  userRegisterController,
  userLoginController,
  getUserProfile,
  userProfileUpdate,
  updateUserDp,
  getUserList,
  followOthers,
  unfollowOthers,
};
