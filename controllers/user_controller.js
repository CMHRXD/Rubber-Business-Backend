import { idGenerator, confirmationEmail, JWTGenerator, PasswordEmail } from '../helpers/helpers_functions.js'
import Users from '../models/users.js'
import bcrypt from "bcrypt";
import Roles from '../models/roles.js';

const createUser = async (req, res) => {
    //Avoid Duplicates Accounts
    const { name } = req.rol;
    const duplicateAccount = await Users.findOne({ email: req.body.email });
    if (duplicateAccount) {
        return res.status(400).json({ msg: "Usuario Registrado" });
    }

    try {
        const user = new Users(req.body);
        const saveUser = await user.save();
        if (name) {
            saveUser.token = null;
            saveUser.isActivate = true;
            await saveUser.save();
            res.json(saveUser);
            return;
        }
        //Send Email
        confirmationEmail({ email: saveUser.email, name: saveUser.name, token: saveUser.token })
        res.json(saveUser);

    } catch (error) {
        res.json({ msg: error });
    }
}

const confirmUser = async (req, res) => {
    const { token } = req.params;
    try {
        const searchUser = await Users.findOne({ token });
        if (!searchUser) {
            return res.json({ msg: "Token Invalido" });
        }
        //Delete token and updated validated status to true
        searchUser.token = null;
        searchUser.isActivate = true;

        await searchUser.save();
        res.json({ msg: "Cuenta Confirmada" });

    } catch (error) {
        res.json({ msg: error });
    }

}

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: "Usuario no encontrado" });
    }
    if (!user.isActivate) {
        return res.status(400).json({ msg: "Cuenta no confirmada" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Contraseña Incorrecta" });
    }
    const rol = await Roles.findById(user.rol);

    user.token = JWTGenerator(user._id);

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        rol: rol.name,
        token: user.token,
        sucursal: user.sucursal,
    });
}

const getUser = async (req, res) => {
    const { name } = req.rol;
    res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        rol: name,
        sucursal: req.user.sucursal,
    });
}
const getUsers = async (req, res) => {
    const users = await Users.find();
    res.json(users);
}
const updateUser = async (req, res) => {

    const { id } = req.params;
    const { name, email, role, sucursal } = req.body;

    try {
        const user = await Users.findById(id);
        if (!user) {
            return res.status(400).json({ msg: "Usuario no encontrado" });
        }

        //Check if email exist in other user and if it is different
        const emailExist = await Users.findOne({ email: email, _id: { $ne: id } });
        if(emailExist){
            return res.status(400).json({ msg: "El correo ya existe" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.sucursal = sucursal || user.sucursal;
        await user.save();

        res.json(user);

    } catch (error) {
        res.json({ msg: "No se ha podido actualizar el usuario" });
    }
}

// Starting Password Change Process
const passowrdForgot = async (req, res) => {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: "Usuario no encontrado" });
    }
    user.token = idGenerator();
    await user.save();
    //Send Email
    PasswordEmail({ email: user.email, name: user.name, token: user.token })
    res.json({ msg: "Se ha enviado un correo para restablecer la contraseña" });
}


const checkToken = async (req, res) => {
    const { token } = req.params;
    const userToken = await Users.findOne({ token });
    if (!userToken) {
        return res.json({ msg: "Token Invalido" });
    }
    res.json({ msg: "Token Valido" });
}

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await Users.findOne({ token });
    if (!user) {
        return res.json({ msg: "Token Invalido" });
    }
    user.password = password;
    user.token = null;
    await user.save();
    res.json({ msg: "Contraseña Actualizada" });
}

const updatePassword = async (req, res) => {

    const { id } = req.user;
    const { pa, pn } = req.body;
    try {
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "El usuario no existe" });
        }
        //Validate Password
        if (!await bcrypt.compare(pa, user.password)) {
            return res.status(400).json({ msg: "La contraseña no es correcta" });
        }
        //Update Password
        user.password = pn;
        await user.save();
        res.json({ msg: "Contraseña Actualizada" });
    } catch (error) {
        res.json({ msg: "No se ha podido actualizar la contraseña" });
    }
}


export {
    createUser,
    getUser,
    getUsers,
    updateUser,

    confirmUser,
    authenticateUser,

    passowrdForgot,
    checkToken,
    resetPassword,
    updatePassword
}

