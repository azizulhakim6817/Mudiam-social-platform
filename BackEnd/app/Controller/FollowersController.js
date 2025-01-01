import {
  followUserService,
  readFollowersService,
  unfollowUserService,
} from "../Service/FollowerService.js";

export const followUser = async (req, res) => {
  const retult = await followUserService(req);
  res.json(retult);
};
export const unfollowUser = async (req, res) => {
  const retult = await unfollowUserService(req);
  res.json(retult);
};
export const readFollowers = async (req, res) => {
  const retult = await readFollowersService(req);
  res.json(retult);
};
