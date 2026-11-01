import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Construction",
        "Interiors",
        "Permits & Approvals",
        "Consulting & 3D",
      ],
    },
    iconName: {
      type: String,
      default: "Building2",
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      default: "",
    },
    deliverables: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Service", serviceSchema);

