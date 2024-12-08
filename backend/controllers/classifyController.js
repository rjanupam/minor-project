import multer from "multer";
import fs from "fs";
import path from "path";
import Image from "../models/Image.js";

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
});

const loadGradioClient = async () => {
  return import("@gradio/client");
};

export const classifyImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(process.cwd(), req.file.path);
    const { Client } = await loadGradioClient();

    const client = await Client.connect("rjAnupam/lungcare");
    const fileBlob = fs.readFileSync(filePath);

    const result = await client.predict("/predict", {
      image: new Blob([fileBlob]),
    });

    const newImage = new Image({
      filename: req.file.filename,
      result: result.data[0],
    });
    newImage.save();

    res.json({ data: result.data, filename: req.file.filename });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

export { upload }; // Export the upload middleware if needed
