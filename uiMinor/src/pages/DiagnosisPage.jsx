
function DiagnosisPage() {
    return (
      <div className="pt-16">
        <h1 className="text-3xl font-bold text-center mt-10">Diagnosis Page</h1>
        <p className="text-center mt-4">Enter your symptoms to get a diagnosis.</p>
        <div className="flex justify-center mt-6">
          <input type="text" placeholder="Enter symptoms" className="border p-2" />
          {/* <button onClick={link:ImageUploadPage} 
          className="bg-blue-500 text-white p-2 ml-2">Submit</button> */}
        </div>
      </div>
    );
  }
  
export default DiagnosisPage;
