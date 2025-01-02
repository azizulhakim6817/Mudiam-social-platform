import express from "express";
const router = express.Router();

import AuthMiddleware from "./../Middleware/AuthenVerity.js";
import * as UsersController from "../Controller/usersController.js";
import * as BlogsController from "../Controller/BlogsController.js";
import * as FollowerController from "../Controller/FollowersController.js";
import * as ShareBlogController from "../Controller/ShareBlogController.js";

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

// !Blogs............................
router.post("/blogCreate", AuthMiddleware, BlogsController.blogcreate);
router.get("/blogRead", BlogsController.blogRead);
router.post("/updateBlog/:blogID", AuthMiddleware, BlogsController.updateBlog);
router.get("/deleteBlog/:blogID", AuthMiddleware, BlogsController.deleteBlog);
router.get("/blogDetails/:blogID", BlogsController.blogDetails);

//Search Keword Blogs...........
router.get("/listByKeyword", BlogsController.listByKeyword);
//Remark Blogs.........................
router.post("/remarkBlog/:blogID", BlogsController.remarkBlog);

// Blog Tags.................................
/* router.post("/addTag/:blogID", BlogsController.addTag);
router.get("/readTags/:blogID", BlogsController.readTags);
router.get("/deleteTag/:tagID", BlogsController.deleteTag);
router.get("/detailsTag/:tagID", BlogsController.detailsTag);
router.get("/listByTag", BlogsController.listByTag); */

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
router.get(
  "/detailsComment/:commentID",
  AuthMiddleware,
  BlogsController.detailsComment
);

//! Like & Dislike.....................................
router.post("/like/:blogID", AuthMiddleware, BlogsController.like);
router.post("/dislike/:blogID", AuthMiddleware, BlogsController.dislike);

//! Share Blog post..................................
router.post("/share/:blogID", AuthMiddleware, ShareBlogController.share);
router.get(
  "/readSharedPosts/:userID",
  AuthMiddleware,
  ShareBlogController.readSharedPosts
);

router.get(
  "/detailssharedPost/:sharedPostID",
  AuthMiddleware,
  ShareBlogController.detailssharedPost
);

router.get(
  "/deleteSharedPost/:sharedPostID",
  AuthMiddleware,
  ShareBlogController.deleteSharedPost
);

router.get(
  "/sharedPostUserId/:sharedPostUserID",
  AuthMiddleware,
  ShareBlogController.sharedPostUserId
);

//!Save the post..........
router.post("/savePost/:blogID", AuthMiddleware, BlogsController.savePost);
router.get("/savedPosts/:userID", AuthMiddleware, BlogsController.savedPosts);
router.get("/unsave/:savedPostID", AuthMiddleware, BlogsController.unsave); 

export default router;
