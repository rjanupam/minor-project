import Report from "../models/Report.js";
import Patient from "../models/Patient.js";
import Image from "../models/Image.js";
import User from "../models/User.js";
//import sendEmail from "../utils/emailService.js";

export const add = async (req, res) => {
  try {
    const { authorId, patientEmail, title, description, imageId } = req.body;

    if (!authorId || !patientEmail || !title || !description || !imageId) {
      return res.status(400).json({ error: "All fields are required" });
    } else if (authorId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (imageId) {
      const image = await Image.findById(imageId);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
    }

    const patient = await Patient.findOne({ email: patientEmail });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const report = new Report({
      author: authorId,
      patient: patient._id,
      title,
      description,
      imageId: imageId ? imageId : null,
    });
    await report.save();

    // Send email to patient
    /*    if (patient) {
      const patientEmail = patient.email;
      const emailBody = `
        <p>Dear ${patient.name},</p>
        <p>Your report is ready.</p>
        <p><b>${title}</b></p>
        <p>${description}</p>
      `;
      await sendEmail(patientEmail, "Your LungCare Report", emailBody);
    }
*/
    res
      .status(201)
      .json({ message: "Report added successfully.", reportId: report._id });
  } catch (error) {
    console.error("Error adding report:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};

export const search = async (req, res) => {
  try {
    const {
      author_username,
      patient_username,
      title,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    const searchQuery = {};

    if (author_username) {
      const author = await User.findOne({ username: author_username });
      searchQuery.author = author ? author._id : null;
    }

    if (patient_username) {
      const patient = await Patient.findOne({ username: patient_username });
      searchQuery.patient = patient ? patient._id : null;
    }

    if (title) {
      searchQuery.title = { $regex: title, $options: "i" };
    }

    if (startDate || endDate) {
      searchQuery.createdAt = {};
      if (startDate) searchQuery.createdAt.$gte = new Date(startDate);
      if (endDate) searchQuery.createdAt.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const reports = await Report.find(searchQuery)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalReports = await Report.countDocuments(searchQuery);

    res.status(200).json({
      total: totalReports,
      page: page,
      limit: limit,
      reports,
    });
  } catch (error) {
    console.error("Error searching reports:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
