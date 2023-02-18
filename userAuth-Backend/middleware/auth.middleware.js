import asyncHandler from "../utils/asyncHandler.js";
import config from "../config/index.js";
import Jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";
import User from "../model/user.schema.js";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
  let token;

  if (
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.startWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }
  //   console.log(token);

  if (!token) {
    throw new CustomError("token not found try login", 400);
  }

  try {
    const decodeJwt = Jwt.verify(token, config.JWT_SECRET);
    console.log(decodeJwt);
    req.user = await User.findById(decodeJwt.id);
    // console.log(req.user);
    next();
  } catch (err) {
    console.log(err.message);
    throw new CustomError("Not authorized to access this route", 401);
  }
});
