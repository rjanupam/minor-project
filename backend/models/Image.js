import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: false,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Image", imageSchema);
