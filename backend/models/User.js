import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    trim: true,
  },
  designation: {
    type: String,
    trim: true,
  },
  phoneNo: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  nationality: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  // isVerified: {
  //   type: Boolean,
  //   default: false,
  // },
  // resetPasswordToken: String,
  // resetPasswordExpiresAt: Date,
  // verificationToken: String,
  // verificationTokenExpiresAt: Date,
});


export const User = mongoose.model("User", userSchema);