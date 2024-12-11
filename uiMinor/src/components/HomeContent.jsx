import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-rows-12 max-h-max h-min">
      <div className="flex flex-col text-center justify-center items-center gap-10 row-span-2">
        <div className="">
          <h1 className="text-4xl font-bold mt-10">Welcome to Lung Care.AI</h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 h-32 row-span-9">
        <div className="col-span-5 m-4 p-10">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti doloribus voluptatibus dolorum labore dolore nulla reiciendis eum eius nostrum qui sit velit omnis, corporis explicabo? Tenetur, expedita adipisci? Eum, fugit.
          </p>
        </div>
        <div className="col-span-2 m-4 p-10">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti doloribus voluptatibus dolorum labore dolore nulla reiciendis eum eius nostrum qui sit velit omnis, corporis explicabo? Tenetur, expedita adipisci? Eum, fugit.
          </p>
        </div>
        <div className="col-span-5 m-10 p-10 place-self-center">
          <p>Upload your X-ray Image here to get started</p>
          <button
            onClick={() => navigate("/ImageUploadPage")}
            type="button"
            className="mr-4 py-2 px-4 rounded-full border-0 text-md font-semibold bg-blue-50 text-green-700 hover:bg-green-100">
            <p>Upload Your Image</p>
          </button>
        </div>
      </div>
      <footer className="bg-gray-800 text-white text-center row-span-1">
      <div className="flex-grow text-red-600 bg-zinc-500 p-4">
        <p>
          Disclaimer: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, iusto in officiis beatae maiores nulla vero laboriosam sint quidem nesciunt tenetur ex est! Nesciunt, voluptate recusandae laudantium tenetur dicta dolorum!
        </p>
      </div>
        <p>
          © 2024 Lung Care.AI. All rights reserved. This application is not a substitute for professional medical advice. Always consult a healthcare provider for a diagnosis.
        </p>
      </footer>
    </div>
  );
}

export default Home;
