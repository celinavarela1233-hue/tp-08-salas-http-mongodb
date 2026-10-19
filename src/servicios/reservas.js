const mongoose = require("mongoose");
const Reserva = require("../modelos/reserva");

async function obtenerTodas(filtro = {}) {
  const criterio = {};

  if (filtro.sala) {
    if (Array.isArray(filtro.sala)) {
      const error = new Error("El parámetro 'sala' no puede repetirse.");
      error.status = 400;
      throw error;
    }
    criterio.sala = filtro.sala;
  }

  return await Reserva.find(criterio);
}

async function obtenerPorId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("ID mal formado.");
    error.status = 400;
    throw error;
  }

  const reserva = await Reserva.findById(id);
  if (!reserva) {
    const error = new Error("Reserva no encontrada.");
    error.status = 404;
    throw error;
  }

  return reserva;
}

async function crear(datos) {
  const datosFiltrados = {
    estudiante: datos.estudiante,
    email: datos.email,
    sala: datos.sala,
    fecha: datos.fecha,
    turno: datos.turno,
    personas: datos.personas,
  };

  const nuevaReserva = new Reserva(datosFiltrados);
  return await nuevaReserva.save();
}

async function contarTodas() {
  return await Reserva.countDocuments();
}

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  contarTodas,
};