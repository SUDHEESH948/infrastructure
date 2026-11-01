import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    galleryId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Gallery item title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Infrastructure",
        "Construction",
        "Surveying",
        "Project Management",
        "Other",
      ],
      default: "Infrastructure",
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gallery", gallerySchema);

