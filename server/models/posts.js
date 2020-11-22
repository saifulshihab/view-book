import mongoose from 'mongoose';

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
    like: [LikeSchema]    
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model('Post', PostSchema);
export default Post;
