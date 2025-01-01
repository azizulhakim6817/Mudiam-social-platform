import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    blogID: { type: mongoose.Schema.Types.ObjectId, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const CommentModel = mongoose.model("comments", DataSchema);

export default CommentModel;
