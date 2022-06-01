import mongoose from "mongoose";

const productosTable = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    brand:{
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
        default: "null",
    },
    cant: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    sucursal: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Sucursales',
    },
    image:{
        type: String,
        required: true,
        default: "null",
    },

} , {timestamps:true});

const Productos = mongoose.model("Productos", productosTable);

export default Productos;