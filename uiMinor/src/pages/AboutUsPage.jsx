import React from "react";

function AboutUsPage() {
  return (
    <div className="  bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        
        <p className="text-lg text-gray-600 mb-8">Team LungCare.ai</p>
        
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Our Team</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img className="w-24 h-24 rounded-full mx-auto mb-4" src="/team-member1.jpg" alt="Team Member 1" />
            <h3 className="text-xl font-semibold text-gray-800">Anupam Jain</h3>
            <p className="text-gray-600">Everthing</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <img className="w-24 h-24 rounded-full mx-auto mb-4" src="/team-member2.jpg" alt="Team Member 2" />
            <h3 className="text-xl font-semibold text-gray-800">Atharv Mahajan</h3>
            <p className="text-gray-600">Position</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <img className="w-24 h-24 rounded-full mx-auto mb-4" src="/team-member3.jpg" alt="Team Member 3" />
            <h3 className="text-xl font-semibold text-gray-800">Ashish Dubey</h3>
            <p className="text-gray-600">Position</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <img className="w-24 h-24 rounded-full mx-auto mb-4" src="/team-member4.jpg" alt="Team Member 4" />
            <h3 className="text-xl font-semibold text-gray-800">Ayush Sharma</h3>
            <p className="text-gray-600">:/ </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
