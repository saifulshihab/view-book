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

const PostSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    like: {
      type: Number,
      default: 0,
    },
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model('Post', PostSchema);
export default Post;
