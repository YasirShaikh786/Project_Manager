import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";

const HomePage = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Project A", leader: "Leader A", startDate: "2023-01-01", status: "Active", department: "Department A" },
    { id: 2, name: "Project B", leader: "Leader B", startDate: "2023-02-01", status: "Completed", department: "Department B" },
    { id: 3, name: "Project C", leader: "Leader C", startDate: "2023-03-01", status: "Active", department: "Department C" },
  ]);

  const addProject = (project) => {
    setProjects([...projects, { id: projects.length + 1, ...project }]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 ml-60">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ProjectForm addProject={addProject} />
        <ProjectList projects={projects} />
      </div>
    </div>
  );
};

export default HomePage;
