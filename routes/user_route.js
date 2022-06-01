import express from "express";
import {
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
} from "../controllers/user_controller.js";
import checkAuth from "../middleware/auth_middleware.js";


const userRoutes = express.Router();

// Public routes
userRoutes.post("/Login", authenticateUser);

userRoutes.post("/SingUp", createUser);

userRoutes.get("/ConfirmAccount/:token",confirmUser);

userRoutes.post("/ForgotPassword",passowrdForgot);

userRoutes.route("/ForgotPassword/:token").get(checkToken).post(resetPassword);


//Private Area
userRoutes.get("/profile",checkAuth,getUser);

userRoutes.get("/admin/get-users",checkAuth,getUsers);

userRoutes.post("/admin/create-user",checkAuth,createUser);

userRoutes.put("/profile/:id",checkAuth,updateUser);

userRoutes.put("/pasword-update",checkAuth,updatePassword);

export default userRoutes;






