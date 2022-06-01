import mongoose from "mongoose";

const rolesTable = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const Roles = mongoose.model("Roles", rolesTable);

export default Roles;
