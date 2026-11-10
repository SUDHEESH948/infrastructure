import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Onset Infra Administrator",
      trim: true,
    },
    username: {
      type: String,
      default: "admin",
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
