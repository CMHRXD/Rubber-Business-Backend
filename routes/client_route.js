import express from 'express';
import checkAuth from '../middleware/auth_middleware.js';
import { createClient, getClients, getOneClient, updateClient, deleteClient } from '../controllers/clients_controller.js';

const clientRoute = express.Router();

clientRoute.get('/get-clients',checkAuth, getClients);
clientRoute.get('/get-one-client/:id',checkAuth, getOneClient);
clientRoute.post('/add-client',checkAuth, createClient);
clientRoute.put('/update-client/:id',checkAuth, updateClient);
clientRoute.delete('/delete-client/:id',checkAuth, deleteClient);

export default clientRoute;
