import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    blogID: { type: mongoose.Schema.Types.ObjectId },
    likes: [{ type: mongoose.Schema.Types.ObjectId }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const LikeModel = mongoose.model("likes", DataSchema);

export default LikeModel;
