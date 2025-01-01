import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    img: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", DataSchema);
export default UserModel;
