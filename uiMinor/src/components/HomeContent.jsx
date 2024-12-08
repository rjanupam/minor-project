import { Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

    return (
      <div className="flex flex-col  text-center justify-center items-center gap-10 ">
        <h1 className=" text-4xl font-bold mt-10">Welcome to Lung Care.AI</h1>
        <p>Upload your X-ray Image here to get started</p>
        <button onClick={()=>navigate("/ImageUploadPage")}
        type="button" className=" mr-4 py-2 px-4
      rounded-full border-0
      text-md font-semibold
      bg-blue-50 text-green-700
      hover:bg-green-100">
          <p className=" ">Upload Your Image</p>
        </button>
      </div>
    );
  }
  
  export default Home;
  

