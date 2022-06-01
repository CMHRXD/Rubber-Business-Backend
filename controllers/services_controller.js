import Services from "../models/services.js";

const createService = async (req, res) => {
    //check if service exists
    const serviceExists = await Services.findOne({ name: req.body.name });
    if (serviceExists) {
        return res.json({ msg: 'Servicio Existente' });
    }
    try {
        const service = new Services(req.body);
        const saveService = await service.save();
        res.json(saveService);
    } catch (error) {
        res.json({ msg: error });
    }
}

const getServices = async (req, res) => {
    try {
        const services = await Services.find();
        res.json(services);
    } catch (error) {
        res.json({ msg: error });
    }
}

const getService = async (req, res) => {

    const { id } = req.params;
    try {
        const service = await Services.findById(id);
        res.json(service);

    } catch (error) {
        res.json({ msg: "Servicio no encontrado" });
    }
}

const updateService = async (req, res) => { 
    const { id } = req.params;
    const service = await Services.findOne({ _id: id });
    if (!service) {
        return res.status(400).json({ msg: "Servicio no encontrado" });
    }

    try {
        service.name = req.body.name || service.name;
        service.description = req.body.description || service.description;
        service.price = req.body.price || service.price;
        service.sucursal = req.body.sucursal || service.sucursal;

        await service.save();
        res.json(service);

    } catch (error) {
        res.json({ msg: error });
    }
}

const deleteService = async (req, res) => { 
    const { id } = req.params;
    const service = await Services.findOne({ _id: id });
    if (!service) {
        return res.status(400).json({ msg: "Servicio no encontrado" });
    }

    try {
        await service.remove();
        res.json({ msg: "Servicio Eliminado" });

    } catch (error) {
        res.json({ msg: error });
    }
}

export {
    createService,
    getServices,
    getService,
    updateService,
    deleteService
}