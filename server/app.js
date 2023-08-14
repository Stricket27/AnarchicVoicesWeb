const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prism = new PrismaClient();

//---Archivos de rutas---
const userRoutes = require("./routes/userRoutes");
const tipoUsuarioRoutes = require("./routes/tipoUsuarioRoutes");
const calificacionUsuarioRoutes = require("./routes/calificacionUsuarioRoutes");
const direccionRoutes = require("./routes/direccionRoutes");
const ordenCompraRoutes = require("./routes/ordenCompraRoutes");
const productoRoutes = require("./routes/productoRoutes");
const fotografiaRoutes = require("./routes/fotografiaRoutes")
const categoriaRoutes = require("./routes/categoriaRoutes");
const metodoPagoRoutes = require("./routes/metodoPagoRoutes");
const mensajeriaRoutes = require("./routes/mensajeriaRoutes");
const detalle_usuarioTipo = require("./routes/detalle_usuarioTipoRoutes")

// Acceder a la configuracion del archivo .env
dotEnv.config();
// Puero que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger("dev"));
// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
express.urlencoded({
extended: true,
})
);


app.use(express.static('uploads'));

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

//---- Definir rutas ----
app.use("/user/", userRoutes);
app.use("/tipoUsuario/", tipoUsuarioRoutes);
app.use("/calificacionUsuario/", calificacionUsuarioRoutes);
app.use("/direccion/", direccionRoutes);
app.use("/ordenCompra/", ordenCompraRoutes);
app.use("/ordenCompraV/",  ordenCompraRoutes);
app.use("/producto/", productoRoutes);
app.use("/fotografia/", fotografiaRoutes);
app.use("/categoria/", categoriaRoutes);
app.use("/metodoPago/", metodoPagoRoutes);
app.use("/mensajeria/",mensajeriaRoutes);
app.use("/detalle_usuarioTipo/", detalle_usuarioTipo);
// Servidor
app.listen(port, () => { 
console.log(`http://localhost:${port}`);
console.log("Presione CTRL-C para deternerlo\n");
});
