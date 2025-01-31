import React, { useState } from "react";

const ProjectsTable = ({ projects, onEditProject, onDeleteProject }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeDialog = () => {
    setSelectedProject(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Leader</th>
              <th className="py-2 px-4 border-b">Department</th>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">Progress</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td
                  className="py-2 px-4 border-b text-blue-500 cursor-pointer hover:underline"
                  onClick={() => handleProjectClick(project)}
                >
                  {project.id}
                </td>
                <td className="py-2 px-4 border-b">{project.name}</td>
                <td className="py-2 px-4 border-b">{project.leader}</td>
                <td className="py-2 px-4 border-b">{project.department}</td>
                <td className="py-2 px-4 border-b">{project.startDate}</td>
                <td className="py-2 px-4 border-b">{project.progress}%</td>
                <td className="py-2 px-4 border-b">
                  {project.endDate ? "Completed" : "Ongoing"}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => onEditProject(project)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteProject(project.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog Box for Project Details */}
      {selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">ID</label>
                <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                  {selectedProject.id}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                  {selectedProject.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Leader</label>
                <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                  {selectedProject.leader}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                  {selectedProject.department}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                  {selectedProject.startDate}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Progress</label>
                <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                  {selectedProject.progress}%
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                  {selectedProject.endDate || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                  {selectedProject.description || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Roll No</label>
                <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                  {selectedProject.rollNo || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Division</label>
                <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                  {selectedProject.division || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Guide Name</label>
                <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                  {selectedProject.guideName || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Copyright</label>
                <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                  {selectedProject.copyright || "No"}
                </p>
              </div>
              {selectedProject.copyright === "Yes" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Application ID</label>
                  <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                    {selectedProject.applicationId || "N/A"}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={closeDialog}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsTable;