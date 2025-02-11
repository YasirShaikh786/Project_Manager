import React, { useState } from "react";

const ProjectForm = () => {
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectMembers, setProjectMembers] = useState("");
    const [department, setDepartment] = useState("");
    const [leader, setLeader] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [division, setDivision] = useState("");
    const [status, setStatus] = useState("Active");
    const [guide, setGuide] = useState("");
    const [progress, setProgress] = useState(0);
    const [copyRight, setCopyRight] = useState("No");
    const [applicationNo, setApplicationNo] = useState("");
  
    const handleAddProject = (e) => {
      e.preventDefault();
      const newProject = {
        id: projects.length + 1,
        name: projectName,
        description: projectDescription,
        members: projectMembers,
        department,
        leader,
        rollNo,
        division,
        status,
        guide,
        progress,
        copyRight,
        applicationNo: copyRight === "Yes" ? applicationNo : "N/A",
      };
      setProjects([...projects, newProject]);
      // Reset form fields
      setProjectName("");
      setProjectDescription("");
      setProjectMembers("");
      setDepartment("");
      setLeader("");
      setRollNo("");
      setDivision("");
        setStatus("Active");
      setGuide("");
      setProgress(0);
      setCopyRight("No");
      setApplicationNo("");
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
  {/* Header */}
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Project</h2>

  {/* Form */}
  <form onSubmit={handleAddProject}>
    {/* Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Project Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Leader */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Leader</label>
        <input
          type="text"
          value={leader}
          onChange={(e) => setLeader(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Members */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Members</label>
        <input
          type="text"
          value={projectMembers}
          onChange={(e) => setProjectMembers(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Department */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Roll No */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Roll No</label>
        <input
          type="text"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Guide */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Guide</label>
        <input
          type="text"
          value={guide}
          onChange={(e) => setGuide(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Progress (%) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
        <input
          type="number"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="0"
          max="100"
          required
        />
      </div>

      {/* Copyright */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Copyright</label>
        <select
          value={copyRight}
          onChange={(e) => setCopyRight(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
