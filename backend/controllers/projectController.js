import {Project} from "../models/Project.js";
import mongoose from "mongoose";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';
import multer from 'multer';



// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

// Route handler for file upload
export const uploadExcel = async (req, res) => {
  try {
    console.log('Upload request received');

    if (!req.file) {
      throw new Error('No file uploaded');
    }

    console.log('File uploaded:', req.file);

    // Read the uploaded Excel file
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    console.log('Excel data:', data);

    // Transform data to exclude unwanted fields
    const projectsToSave = data.map(row => {
      const { _id, createdAt, updatedAt, __v, ...rest } = row;
      return rest;
    });

    console.log('Projects to save:', projectsToSave);

    // Save the data to the database
    const savedProjects = await Project.insertMany(projectsToSave);

    console.log('Projects saved successfully:', savedProjects);

    res.status(201).json({
      message: 'Projects uploaded successfully',
      data: savedProjects,
    });
  } catch (err) {
    console.error('Error in uploadExcel:', err.stack);
    res.status(500).json({
      error: 'Failed to upload Excel file',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};


// Download Excel File
// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadExcel = async (req, res) => {
  try {
    // 1. Create downloads directory if it doesn't exist
    const downloadDir = path.join(__dirname, 'downloads');
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    // 2. Get division from query
    const { division } = req.query;
    console.log('Division:', division);

    // 3. Validate division and build query
    const query = division ? { division: division.trim() } : {};
    console.log('Query:', query);

    // 4. Fetch data from the database
    const projects = await Project.find(query).lean();
    console.log('Projects:', projects);

    // 5. Validate data
    if (!projects || projects.length === 0) {
      throw new Error('No projects found for the specified division');
    }

    // 6. Transform data for Excel (exclude unwanted fields)
    const excelData = projects.map(project => {
      const { _id, createdAt, updatedAt, __v, ...rest } = project;
      return rest;
    });
    console.log('Excel data:', excelData);

    // 7. Generate unique filename
    const timestamp = Date.now();
    const filename = `projects_${timestamp}.xlsx`;
    const filePath = path.join(downloadDir, filename);
    console.log('File path:', filePath);

    // 8. Create Excel file
    const worksheet = xlsx.utils.json_to_sheet(excelData);

    // Set column widths
    worksheet['!cols'] = [
      { width: 20 }, // Column A (projectName)
      { width: 20 }, // Column B (departure)
      { width: 20 }, // Column C (startDate)
      { width: 20 }, // Column D (endDate)
    ];

    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Projects");

    try {
      xlsx.writeFileSync(workbook, filePath);
      console.log('File created successfully:', fs.existsSync(filePath));
    } catch (err) {
      console.error('Error writing Excel file:', err);
      throw err;
    }

    // 9. Verify file creation
    if (!fs.existsSync(filePath)) {
      throw new Error('Excel file could not be created');
    }

    // 10. Send file to client
    res.download(filePath, `projects_${division || 'all'}.xlsx`, (err) => {
      if (err) {
        console.error('Error during download:', err);
      }
      // Delete the file after download
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (unlinkErr) {
        console.error('Error deleting file:', unlinkErr);
      }
    });

  } catch (err) {
    console.error('Error in downloadExcel:', err.stack);
    res.status(500).json({
      error: 'Failed to generate Excel file',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};


// Project controllers

export const addProject = async (req, res) => {
  try {
    // Create and save new project from request body
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
