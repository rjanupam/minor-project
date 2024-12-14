import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10}$/,
  },
  bloodGroup: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Patient", PatientSchema);
