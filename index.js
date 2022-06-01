import express from "express";
import dotenv from "dotenv";

//DB
import conectDB from "./config/db.js";

//ROUTES
import userRoutes from "./routes/user_route.js";
import rolesRoutes from "./routes/roles_route.js";
import productosRoutes from "./routes/productos_route.js";
import sucursalesRoutes from "./routes/sucursales_route.js";
import ventasRoutes from "./routes/ventas_route.js";
import servicesRoutes from "./routes/services_route.js";
import clientRoute from "./routes/client_route.js";

//CORS
import cors from 'cors'; //Protege los accesos a la API

const app = express();  // Create an instance of express
app.use(express.json()); //Middleware para que el servidor entienda los datos en formato JSON
dotenv.config({path: '.env'}); //Configuracion de variables de entorno

const allowedDomains = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedDomains.indexOf(origin) === -1){
            const msg = 'The CORS policy for this site does not ' +
            'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}
app.use(cors(corsOptions));



conectDB(); // conect to DB

const PORT = process.env.PORT || 5000; // Set the port
const HOST = process.env.HOST || ""; // Set the host

//Use Routes
app.use("/api/users", userRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/sucursales", sucursalesRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/clients", clientRoute);
app.use(express.static('uploads'));

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});


