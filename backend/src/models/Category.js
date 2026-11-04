import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["gallery", "project"],
      unique: true,
      index: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    removedCategories: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema);

