import {
  deleteProfielService,
  loginService,
  logOutService,
  profileReadService,
  profileUpdateService,
  registerService,
} from "../Service/userService.js";

//! Register service..................
export const register = async (req, res) => {
  let result = await registerService(req);
  return res.json(result);
};

//! Login....................
export const login = async (req, res) => {
  let result = await loginService(req, res);
  return res.json(result);
};

//! Logout / sign in......................
export const logOut = async (req, res) => {
  let result = await logOutService(res);
  return res.json(result);
};

//! Read profile..........................
export const profileRead = async (req, res) => {
  let result = await profileReadService(req);
  return res.json(result);
};

//! update Profile..............
export const profileUpdate = async (req, res) => {
  let result = await profileUpdateService(req);
  return res.json(result);
};
//! delete Profile..............
export const deleteProfiel = async (req, res) => {
  let result = await deleteProfielService(req);
  return res.json(result);
};


