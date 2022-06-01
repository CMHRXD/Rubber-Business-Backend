import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {idGenerator} from "../helpers/helpers_functions.js";

const usersTable = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: idGenerator(),
    },
    isActivate: {
        type: Boolean,
        required: true,
        default: false,
    },
    rol:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Roles',
    },
    sucursal:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Sucursales',
    }
});

usersTable.pre("save", async function(next){ //Password Hashing

    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


const Users = mongoose.model('Users', usersTable);

export default Users;