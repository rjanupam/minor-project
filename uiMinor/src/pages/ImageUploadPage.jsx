import { useState } from 'react';
import fs from 'fs';
import path from 'path';
// import { fileURLToPath } from '/home/catisgoal/Documents/MinorrProoo/final/';
import { fileURLToPath } from 'url';
import { Await, useSubmit } from 'react-router-dom';

async function ImageUploadPage() {
  const [file, setFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  
// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the URL of the Gradio server
const gradioServerUrl = "http://0.0.0.0:7860/predict";

// Specify the path to your local image file
const imagePath = path.join(__dirname, 'large_cell_carcinoma_of_the_lung.jpg');

// Read the image file
const exampleImage = fs.readFileSync(imagePath);

// Create the form data to send to the server
const formData = new FormData();
formData.append('image', new Blob([exampleImage]), 'large_cell_carcinoma_of_the_lung.jpg');

// Send the image to the Gradio server
const response = await fetch(gradioServerUrl, {
  method: 'POST',
  body: formData,
});

if (!response.ok) {
  console.error('Failed to fetch prediction:', response.statusText);
} else {
  const result = awaish
  t response.json();
  console.log(result.data);
}
  return (
    <div className="pt-16">
      <h1 className="text-3xl font-bold text-center mt-10">Image Upload</h1>
      <div className=''>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className=" box-content mx-auto h-32 w-3/5 content-center p-4 m-5 min-w-30 border-dashed border-4 border-green-500 text-center rounded-lg bg-gray-100"
        >
          Drag and drop an image here
        </div>
      </div>
      <div className="mt-4 text-center">
        <input className="file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-md file:font-semibold
      file:bg-blue-50 file:text-green-700
      hover:file:bg-green-100" type="file" onChange={handleChange} />
      </div>
      {file && <p className="text-center mt-4">Uploaded File: {file.name}</p>}
      <button onClick={(target.files)=>console.log(target.files)>Submit</button> 
      {/* <button type="button" class="bg-indigo-500 ..." disabled>
        <svg class="motion-reduce:hidden animate-spin ..." viewBox="0 0 24 24"></svg>
        Processing...
      </button> */}
    </div>
  );
}

export default ImageUploadPage;
