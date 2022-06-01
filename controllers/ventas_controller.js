import Ventas from '../models/ventas.js';
import Sucursales from '../models/sucursales.js';
import Users from '../models/users.js';
import Clients from '../models/clientes.js';
import Productos from '../models/productos.js';
import Services from '../models/services.js';

import {dateFormat} from '../helpers/helpers_functions.js';

const createVenta = async (req, res) => {
    const { sucursal, user, client, products,services, cant , total } = req.body;
    const sucursales = await Sucursales.find();
    const clients = await Clients.find(); 
    try {
        const venta = new Ventas({
            sucursal,
            user,
            client,
            products,
            services,
            cant,
            total,
        });
        await venta.save();
        const sellformated = {
            _id: venta._id,
            sucursal: sucursales.find(sucursal => sucursal._id.toString() === venta.sucursal.toString()).name,
            user: req.user.name,
            client : clients.find(client => client._id.toString() === venta.client.toString()).name, 
            products: venta.products,
            services: venta.services,
            cant: venta.cant,
            total: venta.total,
            createdAt: dateFormat(venta.createdAt),
        };
        res.json(sellformated);
        
        
    } catch (error) {
        res.json({ msg: "Error en la venta" });
    }
};

const getVentas = async (req, res) => {
    let users = await Users.find();
    let sucursales = await Sucursales.find();
    const clients = await Clients.find(); 
    let ventas;
    const {name}  = req.rol;
    if(name === 'ADMIN'){
        ventas = await Ventas.find();
        ventas = ventas.map(venta => {
            return {
                _id: venta._id,
                sucursal: sucursales.find(sucursal => sucursal._id.toString() === venta.sucursal.toString()).name,
                user:users.find(user => user._id.toString() == venta.user.toString()).name,
                client : clients.find(client => client._id.toString() === venta.client.toString()).name, 
                products: venta.products,
                cant: venta.cant,
                total: venta.total,
                createdAt: dateFormat(venta.createdAt),
            };
        });
    }
    if(name === 'CAJERO'){
        ventas = await Ventas.find().where("user").equals(req.user);
        ventas = ventas.map(venta => {
            return {
                _id: venta._id,
                sucursal: venta.sucursal,
                user: req.user.name,
                client: venta.client,
                products: venta.products,
                cant: venta.cant,
                total: venta.total,
                createdAt: dateFormat(venta.createdAt),
            };
        });
    }
    res.json(ventas)

}

const getOneVenta = async (req, res) => {
    const { id} = req.params;
    try {
        let venta = await Ventas.findById(id);
        const client = await Clients.findById(venta.client);
        let products = venta.products.map(async product => {
            const newProduct = await Productos.findById(product._id);
            return {
                _id: newProduct._id,
                name: newProduct.name,
                cant: newProduct.cant,
                price: newProduct.price,
                cantToSell: product.cantTosell,
            };
        });
        let services = venta.services.map(async service => {
            const newService = await Services.findById(service._id);
            
            return {
                _id: newService._id,
                name: newService.name,
                price: newService.price,
                cantToSell: 1,
            };
        });
        const clientnew = {
            _id: client._id,
            name: client.name,
            c_i: client.c_i,
        };

        venta.client = clientnew;
        venta.products = await Promise.all(products);
        venta.services = await Promise.all(services);

        

        res.json(venta);
    }
    catch (error) {
        res.json({ msg: "No existe la Venta"});
    }
}

const updateVenta = async (req, res) => {
    const { id } = req.params;
    const { sucursal, user, products, services, cant , total } = req.body;
    let sucursales = await Sucursales.find();
    //en el frontend devolver las cantidades de los productos que se van actualizar

    try {
        const venta = await Ventas.findById(id);
        if(!venta){
            return res.status(400).json({msg: "Venta no encontrada"});
        }
        venta.sucursal = sucursal || venta.sucursal;
        venta.user = user || venta.user;
        venta.products = products || venta.products;
        venta.services = services || venta.services;
        venta.cant = cant || venta.cant;
        venta.total = total || venta.total;

        await venta.save();

        res.json(venta);
    } catch (error) {
        res.json({ msg: "Error en la venta" });
    }
}

const deleteVenta = async (req, res) => {
    const {id} = req.params;
    try {
        const sell = await Ventas.findById(id);
        if(!sell){
            return res.status(400).json({msg: "Venta no encontrada"});
        }
        await Ventas.findByIdAndDelete(id);
        res.json({msg: "Venta eliminada"});
    } catch (error) {
        res.json({msg: "Error en la eliminacion de la venta"});
    }

}


export {
    createVenta,
    getVentas,
    getOneVenta,
    updateVenta,
    deleteVenta,
}
