import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [division, setDivision] = useState("");

  const handleLogout = () => {
    // Clear user session (e.g., remove tokens or user data from localStorage)
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("profile");
    // Redirect to login page
    navigate("/login");
  };

  const handleUploadClick = () => {
    setShowUploadDialog(true);
  };

  const handleDownloadClick = () => {
    setShowDownloadDialog(true);
  };

  const closeUploadDialog = () => {
    setShowUploadDialog(false);
  };

  const closeDownloadDialog = () => {
    setShowDownloadDialog(false);
  };

  return (
    <div className="bg-blue-800 text-white w-64 p-4">
      <h2 className="text-2xl font-bold mb-6">Project Manager</h2>
      <ul>
        <li className="mb-4">
          <Link to="/profile" className="hover:text-blue-300">Profile</Link>
        </li>
      
        <li className="mb-4">
          <button
            onClick={handleUploadClick}
            className="w-full text-left hover:text-blue-300"
          >
            Upload
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={handleDownloadClick}
            className="w-full text-left hover:text-blue-300"
          >
            Download
          </button>
        </li>
        <li className="mb-4">
          
          <button
            onClick={handleLogout}
            className="w-full text-left hover:text-blue-300"
          >
            Logout
          </button>
        </li>
      </ul>

      {/* Upload Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className=" text-black text-xl font-bold mb-4">Upload Excel File</h2>
            <div className=" text-black border-2 border-dashed border-gray-400 p-6 text-center">
              <p>Drag and drop an Excel file here</p>
              <p className="text-sm text-gray-500">or</p>
              <input
                type="file"
                accept=".xlsx, .xls"
                className="mt-4"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    console.log("File selected:", file.name);
                    // Handle file upload logic here (frontend only)
                  }
                }}
              />
            </div>
            <button
              onClick={closeUploadDialog}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Download Dialog */}
      {showDownloadDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className=" text-black  text-xl font-bold mb-4">Download Data</h2>
            <div className="mb-4">
              <label className=" text-black block text-sm font-medium mb-2">Select Division</label>
              <input
                type="text"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                list="divisions"
                className="w-full p-2 border rounded-lg"
                placeholder="Type or select a division"
              />
              <datalist id="divisions">
                <option value="Division A" />
                <option value="Division B" />
                <option value="Division C" />
                <option value="Division D" />
              </datalist>
            </div>
            <button
              onClick={() => {
                console.log("Downloading data for division:", division);
                // Handle download logic here (frontend only)
              }}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Download Excel File
            </button>
            <button
              onClick={closeDownloadDialog}
              className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
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