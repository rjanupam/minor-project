const Report = require("../models/Report");
const Patient = require("../models/Patient");
//const sendEmail = require("../utils/sendEmail");

exports.add = async (req, res) => {
  try {
    const { authorId, patientId, title, description, imageUrl } = req.body;
    const report = new Report({
      author: authorId,
      patient: patientId,
      createdAt: new Date(),
      modifiedAt: new Date(),
      title,
      description,
      imageUrl,
    });
    await report.save();
    /*
    const patient = await Patient.findOne({ _id: patientId });

    // send email to patient
    const patientEmail = patient.email;
    const emailBody = `<p>Dear ${patient.name},</p>
                        <p>Your report is ready.</p>
                        <p><b>${title}<b></p>
                        <p>${description}</p>`;
    await sendEmail(patientEmail, "Your LungCare Report", emailBody);
*/
    res
      .status(201)
      .json({ message: "Report added and email sent successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByAuthor = async (req, res) => {
  try {
    const reports = await Report.find({ author: req.user.id });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByPatient = async (req, res) => {
  try {
    const username = req.body.patient;
    const patient = await Patient.findOne({ username: username });
    const reports = await Report.find({
      _id: patient._id,
      author: req.user.id,
    });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
