import express from "express";

import { uploadExcel, downloadExcel, getProjects,  createProject, getProjectById, updateProject, deleteProject } from "../controllers/projectController.js";

import multer from "multer";
const upload = multer({ dest: "uploads/" });

  
 
const router = express.Router();

// Project Routes
router.post("/upload", upload.single("file"), uploadExcel);
router.get("/download", downloadExcel);

router.get("/",getProjects)
router.post("/",createProject);

router.get("/:id",getProjectById)
router.put("/:id",updateProject)
router.delete("/:id", deleteProject);

export default router;