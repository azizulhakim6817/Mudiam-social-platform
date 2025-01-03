import {
  remarkBlogService,
  blogcreateService,
  blogDetailsService,
  blogReadService,
  createCommentService,
  deleteBlogService,
  deleteCommentService,
  detailsCommentService,
  dislikeService,
  likeService,
  listByKeywordService,
  readCommentService,
  updateBlogService,
  updateCommentService,
  saveBlogService,
  savedPostsService,
  unsaveService,
} from "../Service/BlogsService.js";

//! Blog post CRUD operations........................................
export const blogcreate = async (req, res) => {
  let result = await blogcreateService(req);
  return res.json(result);
};
export const blogRead = async (req, res) => {
  let result = await blogReadService(req);
  return res.json(result);
};
export const updateBlog = async (req, res) => {
  let result = await updateBlogService(req);
  return res.json(result);
};
export const deleteBlog = async (req, res) => {
  let result = await deleteBlogService(req);
  return res.json(result);
};
export const blogDetails = async (req, res) => {
  let result = await blogDetailsService(req);
  return res.json(result);
};

// Serch keywords...........
export const listByKeyword = async (req, res) => {
  let result = await listByKeywordService(req);
  return res.json(result);
};

// Remarks Taps................
export const remarkBlog = async (req, res) => {
  let result = await remarkBlogService(req);
  return res.json(result);
};

//! Blog Comments...............................
export const createComment = async (req, res) => {
  let result = await createCommentService(req);
  return res.json(result);
};
export const readComment = async (req, res) => {
  let result = await readCommentService(req);
  return res.json(result);
};

export const updateComment = async (req, res) => {
  let result = await updateCommentService(req);
  return res.json(result);
};

export const deleteComment = async (req, res) => {
  let result = await deleteCommentService(req);
  return res.json(result);
};
export const detailsComment = async (req, res) => {
  let result = await detailsCommentService(req);
  return res.json(result);
};

//! Likes & Dislikes......................................
export const like = async (req, res) => {
  let result = await likeService(req);
  return res.json(result);
};
export const dislike = async (req, res) => {
  let result = await dislikeService(req);
  return res.json(result);
};

//! Save Blog post...............................
export const savePost = async (req, res) => {
  let result = await saveBlogService(req);
  return res.json(result);
};
export const savedPosts = async (req, res) => {
  let result = await savedPostsService(req);
  return res.json(result);
};
export const unsave = async (req, res) => {
  let result = await unsaveService(req);
  return res.json(result);
};
