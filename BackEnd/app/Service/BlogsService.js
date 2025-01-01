import BlogModel from "../Module/BlogModel.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import CommentModel from "../Module/CommentModel.js";
import LikeModel from "../Module/LikeDislikeModel.js";

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

    const comments = await CommentModel.find({ blogID });

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
