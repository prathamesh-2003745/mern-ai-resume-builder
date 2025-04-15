import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: String,
  email: String,
  phone: String,
  address: String,
  education: String,
  experience: String,
  skills: String,
  projects: String,
  template: String, // user ne konsa template select kiya
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
