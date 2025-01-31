import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import AddProjectForm from "../components/AddProjectForm.jsx";
import ProjectsTable from "../components/ProjectsTable.jsx";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [profileCompleted, setProfileCompleted] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if the user has completed their profile
  //   const profile = localStorage.getItem("profile");
  //   if (!profile) {
  //     navigate("/profile"); // Redirect to profile page if profile is not completed
  //   } else {
  //     setProfileCompleted(true);
  //   }
  // }, [navigate]);

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStartDate = filterStartDate ? project.startDate === filterStartDate : true;
    return matchesSearch && matchesStartDate;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <Header />
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="date"
            placeholder="Filter by start date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <AddProjectForm
          onAddProject={handleAddProject}
          editingProject={editingProject}
          onUpdateProject={handleUpdateProject}
        />
        <ProjectsTable
          projects={filteredProjects}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
        />
      </div>
    </div>
  );
};

export default Home;