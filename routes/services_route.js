import express from "express";
import checkAuth from "../middleware/auth_middleware.js"; // Import the auth middleware

import {
    createService,
    getServices,
    getService,
    updateService,
    deleteService
} from "../controllers/services_controller.js"; // Import the services controller

const servicesRoutes = express.Router();

//Private Routes
servicesRoutes.get("/get-services", checkAuth, getServices); // Get all services
servicesRoutes.post("/create-service", checkAuth, createService); // Create a new service
servicesRoutes.put("/update-service/:id", checkAuth, updateService); // Update a service
servicesRoutes.delete("/delete-service/:id", checkAuth, deleteService); // Delete a service

export default servicesRoutes;

