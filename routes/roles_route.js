import express from "express";
import {    
    createRole,
    getRoles,
    updateRole,
    deleteRole} from "../controllers/roles_controler.js";

import checkAuth from "../middleware/auth_middleware.js";

const rolesRoutes = express.Router();

// Private Routes
rolesRoutes.get("/get-roles", checkAuth,  getRoles); // Get all roles
rolesRoutes.post("/create-role", checkAuth,  createRole); // Create a new role
rolesRoutes.put("/update-role/:id", checkAuth,  updateRole); // Update a role
rolesRoutes.delete("/delete-role/:id", checkAuth,  deleteRole); // Delete a role

export default rolesRoutes;
