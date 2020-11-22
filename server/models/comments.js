import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comments", CommentSchema);
export default Comments;
