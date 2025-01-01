import UserModel from "../Module/userModel.js";
import { EncodeToken } from "../utility/tokenUtility.js";

//! Register service.................
export const registerService = async (req) => {
  try {
    let reqBody = req.body;
    let data = await UserModel.create(reqBody);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "error", error: e.toString() };
  }
};

//! Login service...........................
export const loginService = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await UserModel.aggregate([{ $match: reqBody }]);

    if (data.length > 0) {
      let token = EncodeToken(data[0]["email"], data[0]["_id"]);

      // Set cookie
      let options = {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      res.cookie("Token", token, options);
      return { status: "success", token: token, data: data[0] };
    } else {
      return { status: "unauthorized", data: data };
    }
  } catch (e) {
    return { status: "error", error: e.toString() };
  }
};
//! Logout service..........................
export const logOutService = async (res) => {
  try {
    res.clearCookie("Token");
    return { status: "success" };
  } catch (e) {
    return { status: "error", error: e.toString() };
  }
};

//! Profile read service...........................
export const profileReadService = async (req) => {
  let email = req.headers.email;
  try {
    let MatchStage = {
      $match: {
        email,
      },
    };

    let project = {
      $project: {
        firstName: 1,
        lastName: 1,
        gender: 1,
        username: 1,
        phone: 1,
        email: 1,
        img: 1,
      },
    };

    let data = await UserModel.aggregate([MatchStage, project]);

    return { status: "success", data: data[0] };
  } catch (e) {
    return { status: "error", error: e.toString() };
  }
};

//! Profile update service...........................
export const profileUpdateService = async (req) => {
  try {
    let ID = req.params.ID;
    const reqBody = req.body;

    let user = await UserModel.findByIdAndUpdate(ID, reqBody, {
      new: true,
    });

    if (!user) {
      return { status: "not found", message: "User not found" };
    }

    return { status: "success", data: user };
  } catch (error) {
    return { status: "error", error: error.toString() };
  }
};
//! Profile update service...........................
export const deleteProfielService = async (req) => {
  try {
    let ID = req.params.ID;
    let query = { _id: ID };

    let user = await UserModel.deleteOne(query);
    if (!user) {
      return { status: "failed", error: "Failed to delete blog" };
    }

    return { status: "success", data: user };
  } catch (error) {
    return { status: "error", error: error.toString() };
  }
};
