import Clients from "../models/clientes.js";

const createClient = async (req, res) => {
    //Aviod by duplicates
    const duplicateClientEmail = await Clients.findOne({ email: req.body.email});    
    const duplicateClientC_I = await Clients.findOne({ c_i: req.body.c_i});

    if (duplicateClientEmail || duplicateClientC_I) {
        return res.status(400).json({ msg: "Cliente ya existe" });
    }

    try {
        const newClient = new Clients(req.body);
        await newClient.save();
        
        res.json(newClient);
    }
    catch (error) {
        res.json({ msg: error });
    }

}

const getClients = async (req, res) => {
    try {
        const clients = await Clients.find();
        res.json(clients);
    }
    catch (error) {
        res.json({ msg: error });
    }
}

const getOneClient = async (req, res) => {
    const { id } = req.params;
    const client = await Clients.findById(id);
    if (!client) {
        return res.status(400).json({ msg: "Cliente no encontrado" });
    }
    try {
        res.json(client);
    } catch (error) {
        res.json({ msg: error });
    }
}

const updateClient = async (req, res) => {
    const { id } = req.params;
    const client = await Clients.findById(id);
    if (!client) {
        return res.status(400).json({ msg: "Cliente no encontrado" });
    }

    try {
        client.name = req.body.name || client.name;
        client.c_i = req.body.c_i || client.c_i;
        client.phone = req.body.phone || client.phone;
        client.email = req.body.email || client.email;
        client.address = req.body.address || client.address;

        await client.save();
        res.json(client);

    } catch (error) {
        res.json({ msg: error });
    }
}

const deleteClient = async (req, res) => {
    const { id } = req.params;
    const client = await Clients.findById(id);

    if (!client) {
        return res.status(400).json({ msg: "Cliente no encontrado" });
    }
    try {
        await client.remove();
        res.json({ msg: "Cliente eliminado" });

    } catch (error) {
        res.json({ msg: error });
    }
}

export { createClient, getClients, getOneClient, updateClient, deleteClient };