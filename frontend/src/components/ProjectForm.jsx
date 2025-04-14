import React, { useState } from "react";
import { addProject } from "../../services/api.js";

const ProjectForm = () => {
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectMembers, setProjectMembers] = useState("");
    const [department, setDepartment] = useState("");
    const [leader, setLeader] = useState("");
    const [leaderRollNo, setLeaderRollNo] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [division, setDivision] = useState("");
    const [status, setStatus] = useState("Not Started");    
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [guideName, setGuideName] = useState("");
    const [progress, setProgress] = useState(0);
    const [copyRight, setCopyRight] = useState("No");
    const [applicationNo, setApplicationNo] = useState("");
  
    const handleAddProject = async (e) => {
      e.preventDefault();
      
      // Get userId from localStorage
      const userId = localStorage.getItem("userId");
    
      if (!userId) {
        console.error("User not authenticated. Please log in.");
        return;
      }
    
      try {
        const projectData = {
          projectName,
          description: projectDescription,
          members: projectMembers,
          department,
          leader,
          leaderRollNo,
          rollNo,
          division,
          status,
          startDate,
          endDate,
          guideName,
          progress,
          copyRight,
          applicationNo: copyRight === "Yes" ? applicationNo : "N/A",
          userId,  // Add userId to the project data
        };
    
        const response = await addProject(projectData);
    
        if (response) {
          setProjects([...projects, projectData]);
          setProjectName("");
          setProjectDescription("");
          setProjectMembers("");
          setDepartment("");
          setLeader("");
          setLeaderRollNo("");
          setRollNo("");
          setDivision("");
          setStatus("Not Started");
          setStartDate("");
          setEndDate("");
          setGuideName("");
          setProgress(0);
          setCopyRight("No");
          setApplicationNo("");
        }
      } catch (error) {
        console.error('Failed to add project:', error);
      }
    };
    

    return (
      <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Project</h2>
      <form onSubmit={handleAddProject}>
        {/* Grid Layout for Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
    
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
    
          {/* Leader and Leader Roll No. */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Leader</label>
            <div className="flex gap-4">
              <input
                type="text"
                value={leader}
                onChange={(e) => setLeader(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                value={leaderRollNo}
                onChange={(e) => setLeaderRollNo(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=" Leader Roll No."
                required
              />
            </div>
          </div>
    
          {/* Members */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Members</label>
            <div className="flex gap-4">
            <input
              type="text"
              value={projectMembers}
              onChange={(e) => setProjectMembers(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Roll No."
            />
            </div>
          </div>
    
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
    
          {/* Division */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Division</label>
            <input
              type="text"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
    
          {/* Guide */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Guide</label>
            <input
              type="text"
              value={guideName}
              onChange={(e) => setGuideName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
    
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
    
          {/* Progress (%) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
            <input
              type="number"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
              required
            />
          </div>
    
          {/* Start Date and End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
          </div>
    
          {/* Copyright */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Copyright</label>
            <select
              value={copyRight}
              onChange={(e) => setCopyRight(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
    
          {/* Application No. */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Application No.</label>
            <input
              type="text"
              value={applicationNo}
              onChange={(e) => setApplicationNo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={copyRight !== "Yes"}
            />
          </div>
        </div>
    
        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Add Project
        </button>
      </form>
    </div>
    );
};

export default ProjectForm;
