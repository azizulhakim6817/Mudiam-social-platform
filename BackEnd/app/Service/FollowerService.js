import UserModel from "./../Module/userModel.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

//! Follower Servivce................
export const followUserService = async (req, res) => {
  try {
    let targetUserID = new ObjectId(req.params.followerID);
    let currentUserID = new ObjectId(req.headers.user_id);

    let currentUser = await UserModel.findById(currentUserID);
    if (!currentUser) {
      return { status: "error", error: "Current User not found" };
    }

    // Target User খুঁজে বের করুন
    let targetUser = await UserModel.findById(targetUserID);
    if (!targetUser) {
      return { status: "error", error: "Target User not found" };
    }

    // Ensure followers and following are arrays
    if (!Array.isArray(currentUser.followers)) currentUser.followers = [];
    if (!Array.isArray(targetUser.followers)) targetUser.followers = [];

    // Check if already following
    if (targetUser.followers.includes(currentUserID)) {
      return { status: "error", error: "You are already following this user" };
    }

    targetUser.followers.push(currentUserID);
    //currentUser.following.push(targetUserID);

    await targetUser.save();
    await currentUser.save();

    return { status: "success", message: "User followed successfully" };
  } catch (e) {
    return { status: "error", error: e.message };
  }
};

//! Unfollower Service...............
export const unfollowUserService = async (req, res) => {
  try {
    const followerID = req.params.followerID;
    const currentUserID = req.headers.user_id;

    const currentUser = await UserModel.findById(currentUserID);
    if (!currentUser) {
      return { status: "error", error: "User not found" };
    }

    const targetUser = await UserModel.findById(followerID);
    if (!targetUser) {
      return { status: "error", error: "Target user not found" };
    }

    // Remove the target user from the current user's following list
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== followerID.toString()
    );

    // Remove the current user from the target user's followers list
    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== currentUserID.toString()
    );

    // Save the updated user data
    await currentUser.save();
    await targetUser.save();

    return { status: "success", message: "Unfollowed successfully" };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

//! Read Followers Service...........
export const readFollowersService = async (req, res) => {
  try {
    const followerID = new ObjectId(req.params.followerID);
    const user = await UserModel.find(followerID);
    if (!user) {
      return { status: "error", message: "User not found" };
    }

    // Send the followers data back as a response
    return { status: "success", followers: user };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};
