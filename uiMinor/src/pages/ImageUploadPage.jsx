import { useState } from "react";
import { Client } from "@gradio/client";

function ImageUploadPage() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setImagePreview(URL.createObjectURL(droppedFile)); 
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile)); 
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select or drop an image.");
      return;
    }

    // Convert the file to a Blob
    const imageBlob = file instanceof Blob ? file : new Blob([file]);

    try {
      const client = await Client.connect("http://127.0.0.1:7860/");
      const result = await client.predict("/predict", {
        image: imageBlob, // 
      });

      setResponse(result.data); // Set the classification result to state
      alert("Image uploaded and classified successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  return (
    <div className="pt-16">
      <h1 className="text-3xl font-bold text-center mt-10">Image Upload</h1>
      <div>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="box-content mx-auto h-60 w-1/5 content-center p-4 m-5 min-w-30 border-dashed border-4 border-green-500 text-center rounded-lg bg-gray-100"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="object-contain w-full h-full rounded-lg"
            />
          ) : (
            "Drag and drop an image here"
          )}
        </div>
      </div>
      <div className="mt-4 text-center">
        <input
          type="file"
          onChange={handleFileSelect}
          accept="image/*"
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-md file:font-semibold file:bg-blue-50 file:text-green-700 hover:file:bg-green-100"
        />
      </div>
      {file && <p className="text-center mt-4">Selected File: {file.name}</p>}
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="p-2 justify-center mr-4 py-2 px-4 rounded-full border-0 text-md font-semibold bg-blue-50 text-green-700 hover:bg-green-100"
        >
          Submit Image
        </button>
      </div>
      {response && (
        <div className="text-center mt-4">
          <h2 className="font-bold">Classification Results:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ImageUploadPage;
