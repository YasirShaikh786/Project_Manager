import React, { useState, useEffect } from "react";

const AddProjectForm = ({ onAddProject, editingProject, onUpdateProject }) => {
  const [projectName, setProjectName] = useState("");
  const [leader, setLeader] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [division, setDivision] = useState("");
  const [guideName, setGuideName] = useState("");
  const [copyright, setCopyright] = useState("No");
  const [applicationId, setApplicationId] = useState("");

  useEffect(() => {
    if (editingProject) {
      setProjectName(editingProject.name);
      setLeader(editingProject.leader);
      setDepartment(editingProject.department);
      setStartDate(editingProject.startDate);
      setEndDate(editingProject.endDate || "");
      setProgress(editingProject.progress);
      setDescription(editingProject.description || "");
      setRollNo(editingProject.rollNo || "");
      setDivision(editingProject.division || "");
      setGuideName(editingProject.guideName || "");
      setCopyright(editingProject.copyright || "No");
      setApplicationId(editingProject.applicationId || "");
    }
  }, [editingProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      id: editingProject ? editingProject.id : Date.now(),
      name: projectName,
      leader,
      department,
      startDate,
      endDate,
      progress,
      description,
      rollNo,
      division,
      guideName,
      copyright,
      applicationId: copyright === "Yes" ? applicationId : "",
    };
    if (editingProject) {
      onUpdateProject(newProject);
    } else {
      onAddProject(newProject);
    }
    // Reset form fields
    setProjectName("");
    setLeader("");
    setDepartment("");
    setStartDate("");
    setEndDate("");
    setProgress(0);
    setDescription("");
    setRollNo("");
    setDivision("");
    setGuideName("");
    setCopyright("No");
    setApplicationId("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">
        {editingProject ? "Edit Project" : "Add New Project"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Leader</label>
            <input
              type="text"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Progress (%)</label>
            <input
              type="number"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="w-full p-2 border rounded-lg"
              min="0"
              max="100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Roll No</label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Division</label>
            <input
              type="text"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Guide Name</label>
            <input
              type="text"
              value={guideName}
              onChange={(e) => setGuideName(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Copyright</label>
            <select
              value={copyright}
              onChange={(e) => setCopyright(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          {copyright === "Yes" && (
            <div>
              <label className="block text-sm font-medium mb-2">Application ID</label>
              <input
                type="text"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          {editingProject ? "Update Project" : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default AddProjectForm;