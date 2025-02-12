import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";

const HomePage = () => {
  const [projects, setProjects] = useState([
  ]);
  const addProject = (project) => {
    setProjects([...projects, project]); 
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
