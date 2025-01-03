import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },

    // Remarks
    remarks: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        content: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BlogModel = mongoose.model("blogs", DataSchema);
export default BlogModel;
