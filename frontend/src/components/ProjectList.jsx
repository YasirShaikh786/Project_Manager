import React, { useState } from "react";

const ProjectList = ({ projects, onSaveEdit, onDelete }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [editProject, setEditProject] = useState(null);

  // Handle input change in the edit dialog
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProject((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
    <div className="overflow-x-auto shadow-lg rounded-lg">
  <table className="w-full border-collapse bg-white">
    {/* Table Header */}
    <thead className="bg-gray-50">
      <tr>
        <th className="p-3 text-sm font-semibold text-gray-700 text-left">Index</th>
        <th className="p-3 text-sm font-semibold text-gray-700 text-left">Name</th>
        <th className="p-3 text-sm font-semibold text-gray-700 text-left">Leader</th>
        <th className="p-3 text-sm font-semibold text-gray-700 text-left">Start Date</th>
        <th className="p-3 text-sm font-semibold text-gray-700 text-left">Status</th>
        <th className="p-3 text-sm font-semibold text-gray-700 text-left">Department</th>
        <th className="p-3 text-sm font-semibold text-gray-700 text-left">Edit</th>
        <th className="p-3 text-sm font-semibold text-gray-700 text-left">Delete</th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody className="divide-y divide-gray-200">
      {projects.map((project, index) => (
        <tr
          key={project.id}
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          <td className="p-3 text-sm text-gray-700">{index + 1}</td>

          {/* Clickable Name */}
          <td
            className="p-3 text-sm text-blue-500 cursor-pointer hover:underline"
            onClick={() => setSelectedProject(project)}
          >
            {project.name}
          </td>

          <td className="p-3 text-sm text-gray-700">{project.leader}</td>
          <td className="p-3 text-sm text-gray-700">{project.startDate}</td>

          {/* Status with Badge */}
          <td className="p-3">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                project.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : project.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {project.status}
            </span>
          </td>

          <td className="p-3 text-sm text-gray-700">{project.department}</td>

          {/* Edit Button */}
          <td className="p-3">
            <button
              onClick={() => setEditProject(project)}
              className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors duration-200"
            >
              Edit
            </button>
          </td>

          {/* Delete Button */}
          <td className="p-3">
            <button
              onClick={() => onDelete(project.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

     {/* Project Details Modal */}
{selectedProject && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    onClick={() => setSelectedProject(null)}
  >
    <div
      className="bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-2xl transform transition-all duration-300 ease-in-out hover:scale-105"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{selectedProject.name}</h2>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => setSelectedProject(null)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Project Details */}
      <div className="space-y-4 text-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <p><strong>ID:</strong> {selectedProject.id}</p>
          <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-sm ${selectedProject.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{selectedProject.status}</span></p>
          <p><strong>Name:</strong> {selectedProject.name}</p>
          <p><strong>Department:</strong> {selectedProject.department}</p>
          <p><strong>Leader:</strong> {selectedProject.leader}</p>
          <p><strong>Roll No:</strong> {selectedProject.rollNo}</p>
          <p><strong>Division:</strong> {selectedProject.division}</p>
          <p><strong>Guide:</strong> {selectedProject.guide}</p>
          <p><strong>Members:</strong> {selectedProject.members?.join(", ") || "N/A"}</p>
          <p><strong>Application No:</strong> {selectedProject.applicationNo}</p>
          <p><strong>Copyright:</strong> {selectedProject.copyRight}</p>
        </div>

        {/* Progress Bar */}
        <div className="pt-4">
          <p><strong>Progress:</strong> {selectedProject.progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${selectedProject.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Description */}
        <div className="pt-4">
          <p><strong>Description:</strong></p>
          <p className="text-gray-600 mt-1">{selectedProject.description}</p>
        </div>
      </div>

      {/* Close Button */}
      <button
        className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200 w-full"
        onClick={() => setSelectedProject(null)}
      >
        Close
      </button>
    </div>
  </div>
)}

      {/* Edit Project Modal */}
      {editProject && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setEditProject(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Edit Project</h2>
            <div className="space-y-2">
              {Object.keys(editProject).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium">{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={editProject[key]}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => onSaveEdit(editProject)}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditProject(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
