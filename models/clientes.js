import mongoose from "mongoose";

const clientTable = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    c_i: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const Clients = mongoose.model("Clients", clientTable);
export default Clients;