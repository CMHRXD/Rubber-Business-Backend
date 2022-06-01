import express from 'express';
import {     
    createSucursal, 
    getSucursales,
    getSucursal,
    updateSucursal,
    deleteSucursal
       } from '../controllers/sucursales_controller.js';

import  checkAuth  from '../middleware/auth_middleware.js';

const sucursalesRoutes = express.Router();

//Private Routes
sucursalesRoutes.get('/get-one-sucursal/:id',checkAuth, getSucursal);
sucursalesRoutes.get('/get-sucursales',checkAuth, getSucursales);
sucursalesRoutes.post('/create-sucursal',checkAuth, createSucursal);
sucursalesRoutes.put('/update-sucursal/:id',checkAuth, updateSucursal);
sucursalesRoutes.delete('/delete-sucursal/:id',checkAuth, deleteSucursal);

export default sucursalesRoutes;