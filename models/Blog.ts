import mongoose, { Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
  },
  { timestamps: true }
);

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
