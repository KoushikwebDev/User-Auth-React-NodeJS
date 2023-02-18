import User from "../model/user.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";
import cloudinary from "cloudinary";

export const home = (_req, res) => {
  res.status(200).json({
    succes: true,
    message: "hello user welcome to my backend",
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name, email, password)) {
    throw new CustomError("All fields are required", 400);
  }

  console.log(req.body, req.files);
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new CustomError("User already exists", 400);
  }

  let result;
  if (req.files && !existingUser) {
    result = await cloudinary.v2.uploader.upload(req.files.photo.tempFilePath, {
      folder: "userAuth",
      width: 150,
      crop: "scale",
    });
  }

  let userData = {
    name,
    email,
    password,
    photo: { id: result?.public_id, secure_url: result?.secure_url },
  };

  const newUser = await User.create(userData);

  userData.password = undefined;

  //   set cookie
  const token = newUser.getJwtToken(email);
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    // domain: "http://127.0.0.1:5173",
    // secure: true,
    SameSite: "None",
    httpOnly: true,
  };

  //   const options = {
  //     httpOnly: true,
  //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  //     SameSite: "None",
  //     Secure: true,
  //   };

  res.cookie("token", token, options);
  res.status(200).json({
    succes: true,
    token,
    newUser,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw new CustomError("email and password required", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError("Invalid Credential", 404);
  }

  const verifyPassword = await user.verifyPassword(password);

  if (!verifyPassword) {
    throw new CustomError("Invalid Password", 400);
  }

  user.password = undefined;
  //   setcookie
  const token = user.getJwtToken(email);
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    SameSite: "None",

    httpOnly: true,
  };
  //   const options = {
  //     httpOnly: true,
  //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  //     // SameSite: "None",
  //     // Secure: true,
  //   };

  res.cookie("token", token, options);
  res.status(200).json({
    succes: true,
    token,
    user,
  });
});

export const logout = asyncHandler(async (req, res) => {
  const options = {
    expires: new Date(Date.now()),
    SameSite: "None",
    httpOnly: true,
  };
  res.cookie("token", null, options);
  req.user = null;
  res.status(200).json({
    succes: true,
    message: "logout success",
  });
});

// dashboard

export const dashboard = asyncHandler(async (req, res) => {
  const id = req.user._id;
  // console.log(id, req.user.id);
  if (!id) {
    throw new CustomError("middleware user not found, try login", 400);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new CustomError("No user found in database", 404);
  }

  res.status(200).json({
    succes: true,
    message: "welcome to dashboard",
    user,
  });
});

// reset password

export const resetPassword = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const { password, confirmPassword } = req.body;

  if (!id) {
    throw new CustomError("User not loggedin", 404);
  }
  if (!(password && confirmPassword)) {
    throw new CustomError("Password and confirm Password should match", 400);
  }
  if (password !== confirmPassword) {
    throw new CustomError("pass and cpass not matched", 400);
  }

  const user = await User.findOne(id).select("+password");

  user.password = password;

  await user.save({ validateBeforeSave: true });

  res.status(200).json({
    succes: true,
    message: "Password reset succesfully Complete",
  });
});
