import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
});

ReportSchema.pre("save", function (next) {
  this.modifiedAt = new Date();
  next();
});

export default mongoose.model("Report", ReportSchema);
