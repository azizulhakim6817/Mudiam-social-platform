import express from "express";
const router = express.Router();

import AuthMiddleware from "./../Middleware/AuthenVerity.js";
import * as UsersController from "../Controller/usersController.js";
import * as BlogsController from "../Controller/BlogsController.js";
import * as FollowerController from "../Controller/FollowersController.js";

//! Users................
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.get("/logOut", AuthMiddleware, UsersController.logOut);
router.get("/profileRead", AuthMiddleware, UsersController.profileRead);
router.post(
  "/profileUpdate/:ID",
  AuthMiddleware,
  UsersController.profileUpdate
);
router.get("/deleteProfiel/:ID", AuthMiddleware, UsersController.deleteProfiel);

//! Follow & Unfollow...............
router.post(
  "/followUser/:followerID",
  AuthMiddleware,
  FollowerController.followUser
);
router.post(
  "/unfollowUser/:followerID",
  AuthMiddleware,
  FollowerController.unfollowUser
);
router.get(
  "/readFollowers/:followerID",
  AuthMiddleware,
  FollowerController.readFollowers
);
/* 
router.get("/getFollowing/:followerID", AuthMiddleware, UsersController.getFollowing); */

// !Blogs............................
router.post("/blogCreate", AuthMiddleware, BlogsController.blogcreate);
router.get("/blogRead", BlogsController.blogRead);
router.post("/updateBlog/:blogID", AuthMiddleware, BlogsController.updateBlog);
router.get("/deleteBlog/:blogID", AuthMiddleware, BlogsController.deleteBlog);
router.get("/blogDetails/:blogID", BlogsController.blogDetails);

// blog comments.........
router.post(
  "/createComment/:blogID",
  AuthMiddleware,
  BlogsController.createComment
);
router.get("/readComment/:blogID", BlogsController.readComment);
router.post(
  "/updateComment/:commentID",
  AuthMiddleware,
  BlogsController.updateComment
);
router.get(
  "/deleteComment/:commentID",
  AuthMiddleware,
  BlogsController.deleteComment
);

//! Like & Dislike.....................................
router.post("/like/:blogID", AuthMiddleware, BlogsController.like);
router.post("/dislike/:blogID", AuthMiddleware, BlogsController.dislike);

export default router;
