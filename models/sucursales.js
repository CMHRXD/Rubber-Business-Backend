import mongoose from "mongoose";

const sucursalesTable = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const Sucursales = mongoose.model("Sucursales", sucursalesTable);
export default Sucursales;