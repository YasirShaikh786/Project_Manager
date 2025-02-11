import Project from "../models/Project.js";
import xlsx from "xlsx";
import fs from "fs";

// Upload Excel File
export const uploadExcel = async (req, res) => {
  try {
    const file = req.file;
    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    await Project.insertMany(data);
    fs.unlinkSync(file.path); // Delete the uploaded file
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Download Excel File
export const downloadExcel = async (req, res) => {
  try {
    const { division } = req.query;
    const query = division ? { division } : {};
    const projects = await Project.find(query);

    const worksheet = xlsx.utils.json_to_sheet(projects);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Projects");
    const filePath = "downloads/projects.xlsx";
    xlsx.writeFile(workbook, filePath);

    res.download(filePath, () => {
      fs.unlinkSync(filePath); // Delete the file after download
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Project controllers

export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
