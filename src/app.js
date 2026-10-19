const express = require("express");
const path = require("path");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const { NODE_ENV } = require("./config/entorno");
const servicioReservas = require("./servicios/reservas");

const rutasHtmlReservas = require("./rutas/reservas");
const rutasApiReservas = require("./rutas/api-reservas");

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");


app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    if (req.originalUrl.startsWith("/api")) {
      return res.status(400).json({ error: "Sintaxis JSON mal formada." });
    }
    return res.status(400).send("JSON mal formado.");
  }
  next(error);
});


app.get("/", (req, res) => res.render("inicio", { titulo: "Inicio" }));

app.get("/estado", async (req, res, next) => {
  try {
    const totalReservas = await servicioReservas.contarTodas();
    res.json({ estado: "OK", totalReservas });
  } catch (error) {
    next(error);
  }
});


app.use("/reservas", rutasHtmlReservas);
app.use("/api/reservas", rutasApiReservas);


app.use((req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ error: "Recurso API no encontrado." });
  }
  res.status(404).render("no-encontrado", { titulo: "Página no encontrada" });
});


app.use((err, req, res, next) => {
  const status = err.status || 500;
  const mensaje = status === 500 ? "Fallo inesperado del servidor." : err.message;

  if (req.originalUrl.startsWith("/api")) {
    return res.status(status).json({ error: mensaje });
  }

  res.status(status).render("no-encontrado", { titulo: "Error en el servidor" });
});

module.exports = app;