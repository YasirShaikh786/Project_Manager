import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../services/api.js";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [division, setDivision] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="bg-blue-800 text-white w-64 h-screen p-6 overflow-y-auto fixed top-0 left-0 shadow-2xl">
  {/* Header */}
  <h2 className="text-2xl font-bold mb-8">Project Manager</h2>

  {/* Menu Items */}
  <ul>
    <li className="mb-4">
      <button
        onClick={() => setShowUploadDialog(true)}
        className="w-full text-left p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Upload
      </button>
    </li>

    <li className="mb-4">
      <button
        onClick={() => setShowDownloadDialog(true)}
        className="w-full text-left p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9.707 14.707a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 12.586V3a1 1 0 012 0v9.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Download
      </button>
    </li>

    <li className="mb-4">
      <button
        onClick={handleProfileClick}
        className="w-full text-left p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
        Profile
      </button>
    </li>

    <li className="mb-4">
      <button
        onClick={handleLogout}
        className="w-full text-left p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm12.293 4.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L16.586 11H7a1 1 0 110-2h9.586l-1.293-1.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        Logout
      </button>
    </li>
  </ul>

   {/* Upload Dialog */}
{showUploadDialog && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Excel File</h2>

      {/* Drag and Drop Area */}
      <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
        <p className="text-gray-600">Drag and drop an Excel file here</p>
        <p className="text-sm text-gray-400 mt-1">or</p>
        <input
          type="file"
          accept=".xlsx, .xls"
          className="mt-4 opacity-0 absolute w-0 h-0"
          id="fileInput"
          onChange={(e) => console.log("File selected:", e.target.files[0]?.name)}
        />
        <label
          htmlFor="fileInput"
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200"
        >
          Browse Files
        </label>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setShowUploadDialog(false)}
        className="mt-6 w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
      >
        Close
      </button>
    </div>
  </div>
)}

      {/* Download Dialog */}
{showDownloadDialog && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Download Data</h2>

      {/* Division Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Division</label>
        <input
          type="text"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          list="divisions"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type or select a division"
        />
        <datalist id="divisions">
          <option value="Division A" />
          <option value="Division B" />
          <option value="Division C" />
          <option value="Division D" />
        </datalist>
      </div>

      {/* Download Button */}
      <button
        onClick={() => console.log("Downloading data for division:", division)}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
      >
        Download Excel File
      </button>

      {/* Close Button */}
      <button
        onClick={() => setShowDownloadDialog(false)}
        className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default Sidebar;
