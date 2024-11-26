import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function ImageUploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null); // To store the prediction result

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

  const handleSubmit = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Fetch request to your local API
      const response = await fetch("http://localhost:7860/predict", {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Failed to fetch prediction:', response.statusText);
      } else {
        const jsonResponse = await response.json();
        setResult(jsonResponse.data); // Assuming the response contains data in 'data'
        console.log(jsonResponse.data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="pt-16">
      <h1 className="text-3xl font-bold text-center mt-10">Image Upload</h1>
      <div className="mt-4 text-center">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="box-content mx-auto h-32 w-3/5 content-center p-4 m-5 min-w-30 border-dashed border-4 border-green-500 text-center rounded-lg bg-gray-100"
        >
          Drag and drop an image here
        </div>
      </div>
      <div className="mt-4 text-center">
        <input
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-md file:font-semibold file:bg-blue-50 file:text-green-700 hover:file:bg-green-100"
          type="file"
          onChange={handleChange}
        />
      </div>
      {file && <p className="text-center mt-4">Uploaded File: {file.name}</p>}
      <div className="mt-4 text-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>

      {result && (
        <div className="mt-4 text-center">
          <p>Prediction Result: {result}</p>
        </div>
      )}
    </div>
  );
}

export default ImageUploadPage;
