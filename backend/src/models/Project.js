import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      default: "Infrastructure",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    details: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      default: "Kerala",
    },
    image: {
      type: String,
      default: "/projects/building-construction.jpg",
    },
    iconName: {
      type: String,
      default: "Building2",
    },
    deliverables: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Upcoming"],
      default: "Completed",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);

