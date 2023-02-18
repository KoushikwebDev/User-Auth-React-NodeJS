import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import config from "../config/index.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    tolowercase: true,
    maxlength: [20, "Name Character Should be within 20 Charcters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    tolowercase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: [6, "Password Should be atleast Six Charecter."],
    select: false,
  },

  photo: {
    id: {
      type: String,
      // required: true,
    },
    secure_url: {
      type: String,
      // required: true,
    },
  },
});

// encrypt password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods = {
  verifyPassword: async function (userSendPassword) {
    return await bcrypt.compare(userSendPassword, this.password);
    // it returns true/false
  },

  getJwtToken: function (email) {
    return Jwt.sign({ id: this._id, email: email }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });
  },
};

const model = mongoose.model("user", userSchema);
export default model;
