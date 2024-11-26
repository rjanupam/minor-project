// node fetch.js
// fetches the image from the local file system and sends it to the Gradio server for prediction

import { Client } from "@gradio/client";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = await Client.connect("http://0.0.0.0:7860/");

// Specify the path to your local image file
const imagePath = path.join(__dirname, 'large_cell_carcinoma_of_the_lung.jpg');

// Read the image file
const exampleImage = fs.readFileSync(imagePath);

// Send the image to the Gradio client
const result = await client.predict("/predict", {
  image: new Blob([exampleImage]), // Create a Blob from the image data
});

console.log(result.data);
