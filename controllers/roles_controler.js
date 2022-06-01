import Roles from '../models/roles.js';

const createRole = async (req, res) => {
    //Avoid Duplicates Roles
    const duplicateRole = await Roles.findOne({name: req.body.name});
    if(duplicateRole){
        return res.status(400).json({msg: "Rol Registrado"});
    }
    try {
        const role = new Roles(req.body);
        const savedRole = await role.save();
        res.json(savedRole);
    } catch (error) {
        res.json({msg:error});
        
    }
}

const getRoles = async (req, res) => {
    try {
        const roles = await Roles.find();
        res.json(roles);
    } catch (error) {
        res.json({msg: error});
    }
}

const updateRole = async (req, res) => {
    const { id } = req.params;
    const role = await Roles.findOne({_id: id});
    if(!role){
        return res.status(400).json({msg: "Rol no encontrado"});
    }
    try {
        role.name = req.body.name || role.name;
        role.description = req.body.description || role.description;

        await role.save();
        res.json(role);
    
    } catch (error) {
        res.json({msg: error});
    }
}

const deleteRole = async (req, res) =>{
    const { id} = req.params;
    const role  =  Roles.findById(id);
    if(!role){
        return res.status(400).json({msg: "Rol no encontrado"});
    }
    try {
        await role.deleteOne();
        res.json({msg: "Rol Eliminado"});
    }
    catch (error) {
        res.json({msg: error});
    }
}

export {
    createRole,
    getRoles,
    updateRole,
    deleteRole
}