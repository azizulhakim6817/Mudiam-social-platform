import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    blogID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const CommentModel = mongoose.model("comments", DataSchema);

export default CommentModel;
