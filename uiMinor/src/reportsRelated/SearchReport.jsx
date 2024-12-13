import React, { useState, useEffect } from "react";

const SearchReport = () => {
  const [query, setQuery] = useState("");
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10; // Number of reports per page

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/reports?query=${query}&page=${page}&limit=${limit}`);

      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }
      const data = await response.json();
      setReports(data.reports);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); 
    fetchReports();
  };

  return (
    <div className="pt-16 px-4 sm:px-6 md:px-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mt-10">Search Reports</h1>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:gap-4 mb-6 w-full max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Search by report title or patient"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-2/3 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="flex  justify-center rounded-3xl text-sm/6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600
            p-2 transform hover:scale-103 transition-transform duration-300"
        >
          Search
        </button>
      </form>

      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto w-full mx-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border-collapse">
            <thead className="bg-gradient-to-r from-green-400 via-teal-400 to-green-500 text-white">
              <tr>
                <th className="px-4 py-2 sm:px-6 sm:py-4 text-left font-semibold text-sm sm:text-base">Title</th>
                <th className="px-4 py-2 sm:px-6 sm:py-4 text-left font-semibold text-sm sm:text-base">Author</th>
                <th className="px-4 py-2 sm:px-6 sm:py-4 text-left font-semibold text-sm sm:text-base">Patient</th>
                <th className="px-4 py-2 sm:px-6 sm:py-4 text-left font-semibold text-sm sm:text-base">Created At</th>
                <th className="px-4 py-2 sm:px-6 sm:py-4 text-left font-semibold text-sm sm:text-base">Description</th>
                <th className="px-4 py-2 sm:px-6 sm:py-4 text-left font-semibold text-sm sm:text-base">Image</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="transition-all duration-200 ease-in-out hover:bg-gray-200">
                  <td className="px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-300 text-gray-800 font-medium text-sm sm:text-base">{report.title}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-300 text-gray-800 text-sm sm:text-base">{report.author?.name || "N/A"}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-300 text-gray-800 text-sm sm:text-base">{report.patient?.name || "N/A"}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-300 text-gray-800 text-sm sm:text-base">{new Date(report.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-300 text-gray-800 text-sm sm:text-base">{report.description || "N/A"}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-300 text-gray-800 text-sm sm:text-base">
                    {report.image ? (
                      <a
                        href={report.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:underline"
                      >
                        View Image
                      </a>
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 w-full max-w-3xl mx-auto">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="py-2 px-4 rounded-md bg-green-300 hover:bg-green-400 disabled:opacity-50"
        >
          Previous
        </button>

        <p className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </p>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="py-2 px-4 rounded-md bg-green-300 hover:bg-green-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchReport;
