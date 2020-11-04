import mongoose from 'mongoose';
import PassportLocal from 'passport-local-mongoose';

const SocialSchema = new mongoose.Schema({
  platform: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
});
const EduSchema = new mongoose.Schema({
  institute: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  present: {
    type: Boolean,
    default: false,
  },
});

const FollowersSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    dp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const FollowingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    dp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      default: '',
    },
    dp: {
      type: String,
    },
    cover: {
      type: String,
    },
    view: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
    },
    bio: {
      type: String,
    },
    relationship: {
      type: String,
    },
    gender: {
      type: String,
    },
    social: [SocialSchema],
    education: [EduSchema],
    following: [FollowingSchema],
    followers: [FollowersSchema],
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(PassportLocal);

const User = mongoose.model('User', UserSchema);
export default User;
