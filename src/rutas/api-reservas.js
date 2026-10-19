const express = require("express");
const router = express.Router();
const controladorApi = require("../controladores/api-reservas");

router.get("/", controladorApi.listar);
router.get("/:id", controladorApi.obtenerDetalle);
router.post("/", controladorApi.crear);

module.exports = router;