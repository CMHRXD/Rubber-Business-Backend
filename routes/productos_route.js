import express from 'express';

import multer from "multer";

import {     
    createProduct,
    getProducts,
    getOneProduct,
    updateProduct,
    deleteProduct } from '../controllers/productos_controller.js';
    
import checkAuth from '../middleware/auth_middleware.js';



const productosRoutes = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const filter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: filter });
                                                            //     1 mb   * 5  = 5 mb


productosRoutes.get("/get-one-producto/:id",checkAuth,getOneProduct);    //get one
productosRoutes.get("/get-productos", checkAuth, getProducts);   //get all
productosRoutes.post("/create-producto", checkAuth,upload.single('image'),createProduct); //create
productosRoutes.put("/update-producto/:id", checkAuth,upload.single('image'), updateProduct); //update
productosRoutes.delete("/delete-producto/:id", checkAuth, deleteProduct); //delete

export default productosRoutes;
