import React, { useState } from "react";

const SearchPatient = () => {
  const [searchParams, setSearchParams] = useState({
    username: "",
    name: "",
    email: "",
    bloodGroup: "",
    minAge: "",
    maxAge: "",
  });

  const [patients, setPatients] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();

      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      queryParams.append("page", page);
      queryParams.append("limit", pagination.limit);

      const response = await fetch(
        `http://localhost:3000/api/patient/search?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("No patients found");
      }

      const data = await response.json();

      setPatients(data.patients);
      setPagination({
        total: data.total,
        page: data.page,
        limit: data.limit,
      });
    } catch (err) {
      setError(err.message || "An error occurred while searching");
      setPatients([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams({
      username: "",
      name: "",
      email: "",
      bloodGroup: "",
      minAge: "",
      maxAge: "",
    });
    setPatients([]);
    setPagination({
      total: 0,
      page: 1,
      limit: 10,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Search</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={searchParams.username}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={searchParams.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={searchParams.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={searchParams.bloodGroup}
          onChange={(e) =>
            setSearchParams((prev) => ({
              ...prev,
              bloodGroup: e.target.value,
            }))
          }
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Age"
          name="minAge"
          value={searchParams.minAge}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Max Age"
          name="maxAge"
          value={searchParams.maxAge}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleSearch()}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
        >
          Reset
        </button>
      </div>

      {error && (
        <div className="text-red-500 mb-4 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      {patients.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Username</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Age</th>
                <th className="border p-3 text-left">Blood Group</th>
                <th className="border p-3 text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id} className="hover:bg-gray-50">
                  <td className="border p-3">{patient.username}</td>
                  <td className="border p-3">{patient.name}</td>
                  <td className="border p-3">{patient.email}</td>
                  <td className="border p-3">{patient.age}</td>
                  <td className="border p-3">{patient.bloodGroup || "N/A"}</td>
                  <td className="border p-3">{patient.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4 p-3 bg-gray-50 rounded-md">
            <span className="text-gray-700">
              Total Patients: {pagination.total}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleSearch(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handleSearch(pagination.page + 1)}
                disabled={
                  pagination.page * pagination.limit >= pagination.total
                }
                className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPatient;
