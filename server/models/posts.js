import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const LikeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }, 
  } 
);

const PostSchema = mongoose.Schema(
  {
    caption: {
      type: String
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    like: [LikeSchema],
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model('Post', PostSchema);
export default Post;
