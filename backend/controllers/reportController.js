import Report from "../models/Report.js";
import Patient from "../models/Patient.js";
import sendEmail from "../utils/emailService.js";

export const add = async (req, res) => {
  try {
    const { authorId, patientId, title, description, imageId } = req.body;

    if (!authorId || !patientId || !title || !description || !imageId) {
      return res.status(400).json({ error: "All fields are required" });
    } else if (authorId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const report = new Report({
      author: authorId,
      patient: patientId,
      title,
      description,
      imageId: image._id,
    });
    await report.save();

    const patient = await Patient.findById(patientId);

    // Send email to patient
    if (patient) {
      const patientEmail = patient.email;
      const emailBody = `
        <p>Dear ${patient.name},</p>
        <p>Your report is ready.</p>
        <p><b>${title}</b></p>
        <p>${description}</p>
      `;
      await sendEmail(patientEmail, "Your LungCare Report", emailBody);
    }

    res
      .status(201)
      .json({ message: "Report added and email sent successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByAuthor = async (req, res) => {
  try {
    const reports = await Report.find({ author: req.user.id }).populate(
      "imageId",
    );
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByPatient = async (req, res) => {
  try {
    const { patient: username } = req.body;
    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const reports = await Report.find({
      patient: patient._id,
      author: req.user.id,
    }).populate("imageId");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
