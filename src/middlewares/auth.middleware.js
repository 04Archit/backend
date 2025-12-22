import { User } from "../models/user.model";
import { APIError } from "../utils/APIError";
import { asyncHandler } from "../utils/asyncHandler";
import { jwt } from "jsonwebtoken";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accesstoken ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      throw new APIError(401, "unauthorized request");
    }

    const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedtoken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      // discuss about frontend
      throw new APIError(401, "invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new APIError(401, error?.message || "invalid access token");
  }
});
