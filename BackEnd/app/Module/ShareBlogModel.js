import mongoose from "mongoose";

export const DataSchema = mongoose.Schema(
  {
    blogID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogs",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    sharedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const ShareModel = mongoose.model("shares", DataSchema )

export default ShareModel;
