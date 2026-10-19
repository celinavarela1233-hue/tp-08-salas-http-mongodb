const servicioReservas = require("../servicios/reservas");

async function listarHtml(req, res, next) {
  try {
    const reservas = await servicioReservas.obtenerTodas();
    res.render("reservas/lista", { reservas, titulo: "Lista de Reservas" });
  } catch (error) {
    next(error);
  }
}

async function verDetalleHtml(req, res, next) {
  try {
    const reserva = await servicioReservas.obtenerPorId(req.params.id);
    res.render("reservas/detalle", { reserva, titulo: "Detalle de Reserva" });
  } catch (error) {
    if (error.status === 404 || error.status === 400) {
      return res.status(404).render("no-encontrado", { titulo: "Reserva No Encontrada" });
    }
    next(error);
  }
}

function formularioNueva(req, res) {
  res.render("reservas/nueva", {
    titulo: "Nueva Reserva",
    error: null,
    valores: {},
  });
}

async function crearHtml(req, res, next) {
  try {
    await servicioReservas.crear(req.body);
    res.redirect("/reservas");
  } catch (error) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).render("reservas/nueva", {
        titulo: "Nueva Reserva",
        error: mensajes.join(". "),
        valores: req.body,
      });
    }
    next(error);
  }
}

module.exports = {
  listarHtml,
  verDetalleHtml,
  formularioNueva,
  crearHtml,
};