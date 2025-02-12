import express from "express";

import { uploadExcel, downloadExcel, getProjects,  addProject, updateProject, deleteProject } from "../controllers/projectController.js";
import multer from 'multer';

const router = express.Router();

// Project Routes

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Use multer middleware in the route
router.post('/upload', upload.single('file'), uploadExcel);
router.get("/download", downloadExcel);

router.get("/getProjects",getProjects)
router.post('/addproject',addProject);

router.put("/:id",updateProject)
router.delete("/:id", deleteProject);

export default router;