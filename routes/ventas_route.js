import express from 'express';

const ventasRoutes = express.Router();
import {    
    createVenta,
    getVentas,
    getOneVenta,
    updateVenta,
    deleteVenta, } from '../controllers/ventas_controller.js';
import checkAuth from '../middleware/auth_middleware.js';

ventasRoutes.get('/get-one-venta/:id', checkAuth, getOneVenta);
ventasRoutes.get('/get-ventas', checkAuth, getVentas);
ventasRoutes.post('/create-venta',checkAuth, createVenta);
ventasRoutes.put('/update-venta/:id', checkAuth, updateVenta);
ventasRoutes.delete('/delete-venta/:id', checkAuth, deleteVenta);

export default ventasRoutes;