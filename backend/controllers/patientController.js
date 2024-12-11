import Patient from "../models/Patient.js";

export const add = async (req, res) => {
  try {
    const { username, name, age, email, bloodGroup, address, phone } = req.body;

    if (!username || !name || !age || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingPatient = await Patient.findOne({ username });
    if (existingPatient) {
      return res.status(400).json({ error: "Patient already exists" });
    }

    const patient = new Patient({
      username,
      name,
      age,
      email,
      bloodGroup,
      address,
      phone,
    });
    await patient.save();

    res.status(201).json({
      message: "Patient added successfully",
      patient: {
        id: patient._id,
        username: patient.username,
        name: patient.name,
        age: patient.age,
        email: patient.email,
        bloodGroup: patient.bloodGroup,
        address: patient.address,
        phone: patient.phone,
      },
    });
  } catch (error) {
    console.log("hgvs")
    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Validation Error",
        errors,
      });
    }

    // Handle other errors
    console.error("Error creating patient:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const search = async (req, res) => {
  try {
    const {
      username,
      name,
      email,
      phone,
      bloodGroup,
      minAge,
      maxAge,
      page = 1,
      limit = 10,
    } = req.query;

      console.log(req.query);

    const query = {};

    if (username) {
      query.username = { $regex: username, $options: "i" };
    }
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (email) {
      query.email = { $regex: email, $options: "i" };
    }
    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }
    if (phone) {
      query.phone = phone;
    }
    if (minAge || maxAge) {
      query.age = {};
      if (minAge) {
        query.age.$gte = minAge;
      }
      if (maxAge) {
        query.age.$lte = maxAge;
      }
    }

    const skip = (page - 1) * limit;

    const patients = await Patient.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalPatients = await Patient.countDocuments(query);

    if (patients.length === 0) {
      return res.status(404).json({ message: "No patients found" });
    }
    res.status(200).json({
      success: true,
      total: totalPatients,
      page,
      limit,
      patients,
    });
  } catch (error) {
    console.error("Error searching patients:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
