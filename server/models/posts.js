import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const ImageSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

const PostSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
    },
    images: [ImageSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    like: [LikeSchema],
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model('Post', PostSchema);
export default Post;
