import Productos from "../models/productos.js";
import Sucursales from "../models/sucursales.js";


const createProduct = async (req, res) => {
    //Avoid Duplicates Products
    req.body.image = req.file.filename;

    const duplicateProduct = await Productos.findOne({ name: req.body.name });
    if (duplicateProduct) {
        return res.status(400).json({ msg: "Producto Registrado" });
    }
    try {
        const product = new Productos(req.body);
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (error) {
        res.json({ msg: error });
    }
}

const getProducts = async (req, res) => {
    let productos;
    let sucursales = await Sucursales.find();
    try {
        productos = await Productos.find();
        productos = productos.map(producto => {
            return {
                _id: producto._id,
                name: producto.name,
                size: producto.size,
                brand: producto.brand,
                price: producto.price,
                cant: producto.cant,
                sucursal: sucursales.find(sucursal => sucursal._id.toString() === producto.sucursal.toString()).name,
                image: producto.image = process.env.BACKEND_URL +"/"+ producto.image
            };
        });
        res.json(productos);
    } catch (error) {
        res.json({ msg: error });
    }
}

const getOneProduct = async (req, res) => {

    const { id } = req.params;
    const product = await Productos.findById(id);
    if (!product) {
        return res.status(400).json({ msg: "Producto no encontrado" });
    }
    try {
        res.json(product);
    } catch (error) {
        res.json({ msg: error });
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Productos.findOne({ _id: id });
    let sucursales = await Sucursales.find();

    const newSucursal = sucursales.find(sucursal => sucursal.name === req.body.sucursal);
    
    if (!product) {
        return res.status(400).json({ msg: "Producto no encontrado" });
    }
    try {
        product.name = req.body.name || product.name;
        product.brand = req.body.description || product.brand;
        product.cant = req.body.cant || product.cant;
        product.price = req.body.price || product.price;
        product.size = req.body.size || product.size;
        product.sucursal = newSucursal ? newSucursal._id : req.body.sucursal || product.sucursal;
        product.image = req.file ? req.file.filename : product.image;

        await product.save();
        res.json(product);

    } catch (error) {
        res.json({ msg: error });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = Productos.findById(String(id));
    if (!product) {
        return res.status(400).json({ msg: "Producto no encontrado" });
    }
    try {
        await product.deleteOne();
        res.json({ msg: "Producto Eliminado" });
    }
    catch (error) {
        res.json({ msg: error });
    }
}

export {
    createProduct,
    getProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
}