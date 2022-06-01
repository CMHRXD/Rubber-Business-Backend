import jwt from "jsonwebtoken";
import Users from "../models/users.js";
import Roles from "../models/roles.js";


const checkAuth = async (req, res, next) => {
    const { authorization} = req.headers;

    if (!authorization) {
        return res.status(403).json({ msg: "Token Inexistente" });  //Check if token exist
    }
    if (!authorization.startsWith("Bearer")) {
        return res.status(403).json({ msg: "Token no Valido" });    //Check if token is valid
    }
    try {
        const token = authorization.split(" ")[1];  //Get token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  //Decode token

        req.user = await Users.findById(decoded.id).select("-password -token -isActivate"); //Get user data
        req.rol = await Roles.findById(req.user.rol);
        
        next();
    } catch (e) {   
        return res.status(403).json({ msg: "Token no Valido o Inexistente" });
    }
};

export default checkAuth;