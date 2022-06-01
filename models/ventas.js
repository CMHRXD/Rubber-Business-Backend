import mongoose from "mongoose";

const ventasTable = mongoose.Schema({

    sucursal: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Sucursales',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Clients',
    },
    products: {
        type: Array,
        required: true,
    },
    services: {
        type: Array,
        required: true,
    },
    cant : {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
        default: 0,
    }
}, {timestamps:true});

const Ventas = mongoose.model("Ventas", ventasTable);
export default Ventas;