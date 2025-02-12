import mongoose, { Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  liveLink: string;
  repoLink?: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    liveLink: { type: String, required: true },
    repoLink: { type: String }, // Optional
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true, 
  }
);

// Prevent model overwrite upon hot reloading in development
const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
