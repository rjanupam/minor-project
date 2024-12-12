import { useState, useContext } from "react";
import { DataContext } from "../components/DataContext";
import { useNavigate } from "react-router-dom"; 

function ImageUploadPage() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { response, setResponse } = useContext(DataContext);
  const navigate = useNavigate(); 

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

    setSubmitLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/api/classify", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      setResponse(result.data); // Set the classification result to state
      alert("Image uploaded and classified successfully!");
      setSubmitLoading(false);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the image.");
      setSubmitLoading(false);
    }
  };

  const handleViewDiagnosis = () => {
    if (!response) {
      alert("No report available. Please upload an image first.");
      return;
    }
    navigate("/DiagnosisPage"); 
  };

  return (
    <div className="pt-16">
      <h1 className="text-3xl font-bold text-center mt-10">Image Upload</h1>
      <div className="flex flex-col items-center mt-4 p-2">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="flex justify-center items-center h-60 w-full  max-w-md border-4 border-dashed border-green-500 text-center rounded-lg bg-gray-100 mb-4"
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
        <div>
          <input
            type="file"
            onChange={handleFileSelect}
            accept="image/*"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-md file:font-semibold file:bg-blue-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>
        {file && <p className="text-center mt-4 text-sm">Selected File: {file.name}</p>}
        <div className="flex flex-col sm:flex-row justify-center mt-4 gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="p-2 py-2 px-4 rounded-full border-0 text-md font-semibold bg-blue-50 text-green-700 hover:bg-green-100 hover:scale-105 transition-transform duration-300"
          >
            Submit Image
          </button>
          <button
            type="button"
            onClick={handleViewDiagnosis}
            className="p-2 py-2 px-4 rounded-full border-0 text-md font-semibold bg-blue-50 text-green-700 hover:bg-green-100 hover:scale-105 transition-transform duration-300"
          >
            View Diagnosis/Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadPage;
