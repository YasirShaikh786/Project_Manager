import React, { useState, useEffect } from "react";
import { getProjects, deleteProject, updateProject } from "../../services/api.js";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);  // ✅ Fix: Initialize as an array
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [editProject, setEditProject] = useState(null);

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const response = await getProjects();
  
      if (response.data && Array.isArray(response.data)) {
        setProjects(response.data);
        setFilteredProjects(response.data);
        
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchProjects();
  }); 
  
  

  // Handle project deletion
  const handleDelete = async (_id) => {
    try {
      await deleteProject(_id);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Handle search query
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  
    setFilteredProjects(
      query === ""
        ? projects // Only filter the user's projects
        : projects.filter((p) => p.department?.toLowerCase().includes(query))
    );
  };
  

  // Handle project edit submission
  const handleSaveEdit = async () => {
    try {
      await updateProject(editProject._id, editProject);
      setEditProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Department..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm mb-4"
      />

      {/* Project Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse bg-white">
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
          <tbody className="divide-y divide-gray-200">
  {filteredProjects.map((project, index) => (
    <tr key={project._id} className="hover:bg-gray-50 transition-colors duration-200">
      <td className="p-3 text-sm text-gray-700">{index + 1}</td>
      <td className="p-3 text-sm text-blue-500 cursor-pointer hover:underline" onClick={() => setSelectedProject(project)}>
        {project.projectName}
      </td>
      <td className="p-3 text-sm text-gray-700">{project.leader}</td>
      <td className="p-3 text-sm text-gray-700">{new Date(project.startDate).toLocaleDateString()}</td>
      <td className="p-3">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          project.status === "Completed" ? "bg-green-100 text-green-700" :
          project.status === "In Progress" ? "bg-yellow-100 text-yellow-700" :
          "bg-red-100 text-red-700"
        }`}>
          {project.status}
        </span>
      </td>
      <td className="p-3 text-sm text-gray-700">{project.department}</td>
      <td className="p-3">
        <button onClick={() => setEditProject(project)}
          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors duration-200">
          Edit
        </button>
      </td>
      <td className="p-3">
        <button onClick={() => handleDelete(project._id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setSelectedProject(null)}>
          <div className="bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <p className="text-gray-900">{selectedProject.projectName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-900">{selectedProject.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Leader</label>
                <p className="text-gray-900">{selectedProject.leader}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Leader Roll No.</label>
                <p className="text-gray-900">{selectedProject.leaderRollNo}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Members</label>
                <p className="text-gray-900">{selectedProject.members}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <p className="text-gray-900">{selectedProject.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Division</label>
                <p className="text-gray-900">{selectedProject.division}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Guide</label>
                <p className="text-gray-900">{selectedProject.guideName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="text-gray-900">{selectedProject.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Progress (%)</label>
                <p className="text-gray-900">{selectedProject.progress}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <p className="text-gray-900">{new Date(selectedProject.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <p className="text-gray-900">{new Date(selectedProject.endDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Copyright</label>
                <p className="text-gray-900">{selectedProject.copyRight}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Application No.</label>
                <p className="text-gray-900">{selectedProject.applicationNo}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setEditProject(null)}>
          <div className="bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  type="text"
                  value={editProject.projectName}
                  onChange={(e) => setEditProject({ ...editProject, projectName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={editProject.description}
                  onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Leader</label>
                <input
                  type="text"
                  value={editProject.leader}
                  onChange={(e) => setEditProject({ ...editProject, leader: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Leader Roll No.</label>
                <input
                  type="text"
                  value={editProject.leaderRollNo}
                  onChange={(e) => setEditProject({ ...editProject, leaderRollNo: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Members</label>
                <input
                  type="text"
                  value={editProject.members}
                  onChange={(e) => setEditProject({ ...editProject, members: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  value={editProject.department}
                  onChange={(e) => setEditProject({ ...editProject, department: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Division</label>
                <input
                  type="text"
                  value={editProject.division}
                  onChange={(e) => setEditProject({ ...editProject, division: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Guide</label>
                <input
                  type="text"
                  value={editProject.guideName}
                  onChange={(e) => setEditProject({ ...editProject, guideName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={editProject.status}
                  onChange={(e) => setEditProject({ ...editProject, status: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Progress (%)</label>
                <input
                  type="number"
                  value={editProject.progress}
                  onChange={(e) => setEditProject({ ...editProject, progress: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={editProject.startDate}
                  onChange={(e) => setEditProject({ ...editProject, startDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={editProject.endDate}
                  onChange={(e) => setEditProject({ ...editProject, endDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Copyright</label>
                <select
                  value={editProject.copyRight}
                  onChange={(e) => setEditProject({ ...editProject, copyRight: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Application No.</label>
                <input
                  type="text"
                  value={editProject.applicationNo}
                  onChange={(e) => setEditProject({ ...editProject, applicationNo: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={editProject.copyRight !== "Yes"}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                Save
              </button>
              <button
                onClick={() => setEditProject(null)}
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-200"
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