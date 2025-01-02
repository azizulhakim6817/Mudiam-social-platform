import {
  deleteSharedPostService,
  detailssharedPostService,
  readSharedPostsService,
  sharedPostUserIdService,
  shareService,
} from "./../Service/ShareBlogService.js";

export const share = async (req, res) => {
  const result = await shareService(req);
  return res.json(result);
};
export const readSharedPosts = async (req, res) => {
  const result = await readSharedPostsService(req);
  return res.json(result);
};
export const detailssharedPost = async (req, res) => {
  const result = await detailssharedPostService(req);
  return res.json(result);
};
export const deleteSharedPost = async (req, res) => {
  const result = await deleteSharedPostService(req);
  return res.json(result);
};
export const sharedPostUserId = async (req, res) => {
  const result = await sharedPostUserIdService(req);
  return res.json(result);
};
