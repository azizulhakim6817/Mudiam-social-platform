import mongoose from "mongoose";
import BlogModel from "../Module/BlogModel.js";
import ShareModel from "../Module/ShareBlogModel.js";
const { ObjectId } = mongoose.Types;

//! share a blog post.........................
export const shareService = async (req, res) => {
  try {
    let blogID = new ObjectId(req.params.blogID);
    let userID = new ObjectId(req.headers.user_id);
    // Fetch blog by ID
    let blog = await BlogModel.findById(blogID);
    if (!blog) {
      return { status: "blog show failed", error: "Blog not found" };
    }
    // Create a new share post
    let sharePost = await ShareModel.create({
      blogID,
      userID,
      sharedAt: new Date(),
    });
    if (!sharePost) {
      return { status: "Share blog failed", error: "Failed to share blog" };
    }

    return { status: "success", data: sharePost };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};

//! get blog posts by a user.........................
export const readSharedPostsService = async (req, res) => {
  try {
    let userID = req.params.userID;

    let readShare = await ShareModel.find({ userID }).populate("blogID");
    if (!readShare) {
      return { status: "blog show failed", error: "No shared blog found" };
    }
    return { status: "success", data: readShare };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};

//! Details shared Post............................
export const detailssharedPostService = async (req, res) => {
  try {
    let sharedPostID = new ObjectId(req.params.sharedPostID);

    let details = await ShareModel.findById(sharedPostID).populate("blogID");
    if (!details) {
      return { status: "blog show failed", error: "Shared blog not found" };
    }

    return { status: "success", data: details };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};

//! Delete shared Post............................
export const deleteSharedPostService = async (req, res) => {
  try {
    let sharedPostID = new ObjectId(req.params.sharedPostID);
    let query = { _id: sharedPostID };

    let details = await ShareModel.findByIdAndDelete(query);
    if (!details) {
      return { status: "blog show failed", error: "Shared blog not found" };
    }

    return { status: "success", data: details };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};

//! Get the User ID who shared a specific post
export const sharedPostUserIdService = async  (req, res) => {
  try {
    const sharedPostID = new ObjectId(req.params.sharedPostUserID);

    const sharedPost = await ShareModel.findById(sharedPostID).populate(
      "userID"
    );
    if (!sharedPost) {
      return { status: "error", message: "Shared post not found" };
    }

    return { status: "success", data: sharedPost };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};
