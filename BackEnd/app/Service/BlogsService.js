import BlogModel from "../Module/BlogModel.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import CommentModel from "../Module/CommentModel.js";
import LikeModel from "../Module/LikeDislikeModel.js";
import UserModel from "../Module/userModel.js";

//! Blog CRUD operation....................................................
//create blog..................
export const blogcreateService = async (req, res) => {
  try {
    let user_id = new ObjectId(req.headers.user_id);

    let reqBody = req.body;
    reqBody.userID = user_id;

    let newBlgo = await BlogModel.create(reqBody);

    if (!newBlgo) return { status: "failed", error: "Failed to create blog" };

    return { status: "success", data: newBlgo };
  } catch (e) {
    return { status: "error", error: e.toString() };
  }
};

//Read blog...........
export const blogReadService = async (req, res) => {
  try {
    const blog = await BlogModel.find({});

    return { status: "success", data: blog };
  } catch (e) {
    return { status: "error", error: e.toString() };
  }
};
//update blog...........
export const updateBlogService = async (req, res) => {
  let blogID = req.params.blogID;
  let reqBody = req.body;
  try {
    const blog = await BlogModel.findByIdAndUpdate(blogID, reqBody, {
      new: true,
    });
    if (!blog) return { status: "failed", error: "Failed to update blog" };

    return { status: "success", data: blog };
  } catch (error) {
    return { status: "error", error: error.toString() };
  }
};

//Delete blog...........
export const deleteBlogService = async (req, res) => {
  try {
    let blogID = req.params.blogID;
    let query = { _id: blogID };

    let blog = await BlogModel.deleteOne(query);
    if (!blog) {
      return { status: "failed", error: "Failed to delete blog" };
    }

    return { status: "success", data: blog };
  } catch (error) {
    return { status: "error", error: error.toString() };
  }
};

// Details blog..............
export const blogDetailsService = async (req, res) => {
  try {
    let blogID = new ObjectId(req.params.blogID);
    let MatchStage = { $match: { _id: blogID } };

    let JoinWithBrandStage = {
      $lookup: {
        from: "users",
        localField: "userID",
        foreignField: "_id",
        as: "user",
      },
    };

    let UnwindBrandStage = { $unwind: "$user" };

    let BlogUserProjectionStage = {
      $project: {
        title: 1,
        img: 1,
        description: 1,
        createdAt: 1,
      },
    };

    let data = await BlogModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      UnwindBrandStage,
      BlogUserProjectionStage,
    ]);

    if (!data.length) {
      return {
        status: "failed",
        message: "Blog not found",
      };
    }

    return {
      status: "success",
      message: "Blog Detail Successfully",
      data: data,
    };
  } catch (err) {
    return {
      status: "failed",
      messages: "Blog Details Failed",
      error: err.toString(),
    };
  }
};

// Service keyword Blog title and description ..............
export const listByKeywordService = async (req, res) => {
  try {
    let keyword = req.query.keyword;
    if (!keyword) {
      return {
        status: "error",
        message: "Keyword is required",
      };
    }

    // Query blogs by keyword in title or description
    const blogs = await BlogModel.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

    // If no blogs match the keyword
    if (blogs.length === 0) {
      return {
        status: "error",
        message: "No blogs found for the given keyword",
      };
    }
    return {
      status: "success",
      data: blogs,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.toString(),
    };
  }
};

// Remarks Taps blogs ...............
export const remarkBlogService = async (req, res) => {
  try {
    const blogID = new ObjectId(req.params.blogID);
    const userID = new ObjectId(req.headers.user_id);
    const { remark } = req.body;

    // Find the blog
    const blog = await BlogModel.findById(blogID);
    if (!blog) {
      return { status: "error", message: "Blog not found" };
    }

    // Ensure remarks array is initialized
    if (!Array.isArray(blog.remarks)) {
      blog.remarks = [];
    }

    // Add the remark
    blog.remarks.push({ user: userID, content: remark });
    await blog.save();

    // Respond with success
    return {
      status: "success",
      message: "Remark added successfully",
      data: blog,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// !Blgo commmetn ..................................
// create comment......
export const createCommentService = async (req, res) => {
  try {
    let blogID = new ObjectId(req.params.blogID);

    let reqBody = req.body;

    reqBody.userID = new ObjectId(req.headers.user_id);
    reqBody.blogID = blogID;

    let newComment = await CommentModel.create(reqBody);

    return { status: "success", data: newComment };
  } catch (e) {
    return { status: "error", error: e.toString() };
  }
};

// read comment .................................
export const readCommentService = async (req, res) => {
  try {
    const blogID = new ObjectId(req.params.blogID);

    const comments = await CommentModel.find({ blogID }).populate("blogID");

    if (!comments.length) {
      return {
        status: "failed",
        error: "No comments found for this blog post.",
      };
    }

    return { status: "success", data: comments };
  } catch (e) {
    return { status: "error", error: e.toString() };
  }
};

// update comment .................................
export const updateCommentService = async (req, res) => {
  let commentID = req.params.commentID;
  let reqBody = req.body;
  try {
    const comment = await CommentModel.findByIdAndUpdate(commentID, reqBody, {
      new: true,
    });
    console.log(comment);
    if (!comment) {
      return { status: "failed", error: "Failed to update comment" };
    }
    return { status: "success", data: comment };
  } catch (error) {
    return { status: "success", error: error.toString() };
  }
};

// delete comment
export const deleteCommentService = async (req, res) => {
  try {
    let commentID = req.params.commentID;
    let query = { _id: commentID };
    let comment = await CommentModel.deleteOne(query);
    if (!comment) {
      return { status: "failed", error: "Failed to delete comment" };
    }
    return { status: "success", data: comment };
  } catch (error) {
    return { status: "success", error: error.toString() };
  }
};

//details Comment Service
export const detailsCommentService = async (req, res) => {
  try {
    const commentID = new ObjectId(req.params.commentID);

    const singleComment = await CommentModel.findById(commentID);
    if (!singleComment) {
      return { status: "failed", error: "Comment not found" };
    }
    return { status: "success", data: singleComment };
  } catch (error) {
    return { status: "success", error: error.toString() };
  }
};

//! likes Dislikes .....................................
//Like ...........
export const likeService = async (req, res) => {
  try {
    const blogID = new ObjectId(req.params.blogID);
    const userID = new ObjectId(req.headers.user_id);

    let likeDislike =
      (await LikeModel.findOne({ blogID })) ||
      new LikeModel({ blogID, likes: [], dislikes: [] });

    if (likeDislike.likes.includes(userID)) {
      likeDislike.likes = likeDislike.likes.filter(
        (id) => id.toString() !== userID.toString()
      );
    } else if (likeDislike.dislikes.includes(userID)) {
      likeDislike.dislikes = likeDislike.dislikes.filter(
        (id) => id.toString() !== userID.toString()
      );
      likeDislike.likes.push(userID);
    } else {
      likeDislike.likes.push(userID);
    }

    await likeDislike.save();
    return { status: "success", data: likeDislike };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

//Dislike .......................
export const dislikeService = async (req, res) => {
  try {
    const blogID = new ObjectId(req.params.blogID);
    const userID = new ObjectId(req.headers.user_id);

    const blog = await BlogModel.findById(blogID);
    if (!blog) {
      return { status: "failed", error: "Blog post not found" };
    }

    let likeDislike = await LikeModel.findOne({ blogID: blogID });

    if (!likeDislike) {
      likeDislike = new LikeModel({ blogID: blogID, likes: [], dislikes: [] });
    }

    if (likeDislike.likes.includes(userID.toString())) {
      likeDislike.likes = likeDislike.likes.filter(
        (id) => id.toString() !== userID.toString()
      );
      likeDislike.dislikes.push(userID.toString());
    } else if (likeDislike.dislikes.includes(userID.toString())) {
      return { status: "failed", error: "You already disliked this post" };
    } else {
      likeDislike.dislikes.push(userID.toString());
    }

    await likeDislike.save();
    await blog.save();

    return { status: "success", data: likeDislike };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

//!Save Blog post.........................
//save blog post ..............
export const saveBlogService = async (req, res) => {
  try {
    const blogID = new ObjectId(req.params.blogID);
    const userID = new ObjectId(req.headers.user_id);

    const user = await UserModel.findById(userID);
    if (!user) {
      return { status: "error", message: "User not found" };
    }

    // Initialize savedPosts array if undefined
    if (!Array.isArray(user.savedPosts)) {
      user.savedPosts = [];
    }

    // Check if the blog is already saved
    if (user.savedPosts.includes(blogID)) {
      return { status: "error", message: "Blog already saved" };
    }

    // Save savedPosts array......
    user.savedPosts.push(blogID);
    await user.save();

    return {
      status: "success",
      message: "Blog post saved successfully",
      data: user.savedPosts,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.toString(),
    };
  }
};

// saved Posts Service
export const savedPostsService = async (req, res) => {
  try {
    const userID = new ObjectId(req.params.userID);
    const user = await UserModel.findById(userID).populate("savedPosts");

    if (!user) {
      return { status: "error", message: "User not found" };
    }

    return {
      status: "success",
      message: "Saved posts fetched successfully",
      data: user.savedPosts,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.toString(),
    };
  }
};

// unsave blog post .........................
export const unsaveService = async (req, res) => {
  try {
    const { savedPostID } = req.params;
    const { user_id } = req.headers;

    const user = await UserModel.findById(user_id);
    if (!user) return { status: "error", message: "User not found" };

    const index = user.savedPosts.indexOf(savedPostID);
    if (index === -1)
      return { status: "error", message: "Blog post not saved" };

    user.savedPosts.splice(index, 1);
    await user.save();

    return { status: "success", message: "Blog post unsaved successfully" };
  } catch (error) {
    return { status: "error", message: error.toString() };
  }
};
