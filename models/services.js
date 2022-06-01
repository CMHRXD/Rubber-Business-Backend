import mongoose from "mongoose";

const servicesTable = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

    // Relaciones
    // Sucursal
    sucursal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sucursales",
        required: true,
    }
}, {timestamps:true});

const Services = mongoose.model("Services", servicesTable);
export default Services;
