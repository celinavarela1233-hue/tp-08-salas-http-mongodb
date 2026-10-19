const express = require("express");
const router = express.Router();
const controladorHtml = require("../controladores/reservas");


router.get("/nueva", controladorHtml.formularioNueva);


router.get("/", controladorHtml.listarHtml);


router.get("/:id", controladorHtml.verDetalleHtml);


router.post("/", controladorHtml.crearHtml);

module.exports = router;