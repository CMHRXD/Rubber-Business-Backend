import Sucursales from "../models/sucursales.js";

const createSucursal = async (req, res) => {
    //check if sucursal exists
    const sucursalExists = await Sucursales.findOne({name: req.body.name});
    if(sucursalExists){
        return res.json({msg:'Sucursal existente'});
    }
    try {
        const sucursal = new Sucursales(req.body);
        const saveSucursal = await sucursal.save();
        res.json(saveSucursal);
    } catch (error) {
        res.json({msg: error});
    }
}

const getSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursales.find();
        res.json(sucursales);
    } catch (error) {
        res.json({msg: error});
    }
}

const getSucursal = async (req, res) => {

    const { id } = req.params;
    try {
        const sucursal = await Sucursales.findById(id);
        res.json(sucursal);

    } catch (error) {
        res.json({msg: "Sucursal no encontrada"});
    }
}

const updateSucursal = async (req, res) => {

    const { id } = req.params;
    const sucursal = await Sucursales.findOne({_id: id});
    if(!sucursal){
        return res.status(400).json({msg: "Sucursal no encontrada"});
    }

    try {
        sucursal.name = req.body.name || sucursal.name;
        sucursal.address = req.body.address || sucursal.address;
        sucursal.phone = req.body.phone || sucursal.phone;
        sucursal.email = req.body.email || sucursal.email;

        await sucursal.save();
        res.json(sucursal);

    } catch (error) {
        res.json({msg: error});
    }
}

const deleteSucursal = async (req, res) => {

    const { id } = req.params;
    const sucursal = Sucursales.findById(id);
    if(!sucursal){
        return res.status(404).json({msg: "Sucursal no encontrada"});
    }
    await sucursal.deleteOne();
    res.json({msg: "Sucursal eliminada"});
}

export { 
    createSucursal, 
    getSucursales,
    getSucursal,
    updateSucursal,
    deleteSucursal
}