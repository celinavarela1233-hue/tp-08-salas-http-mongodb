const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema(
  {
    estudiante: {
      type: String,
      required: [true, "El estudiante es obligatorio."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio."],
      trim: true,
      match: [/@/, "El email debe contener un carácter @."],
    },
    sala: {
      type: String,
      required: [true, "La sala es obligatoria."],
      enum: {
        values: ["Sala Norte", "Sala Sur", "Sala Multimedia"],
        message: "La sala no es válida.",
      },
    },
    fecha: {
      type: String,
      required: [true, "La fecha es obligatoria."],
      trim: true,
      validate: {
        validator: (v) => String(v).trim().length > 0,
        message: "La fecha no puede estar vacía.",
      },
    },
    turno: {
      type: String,
      required: [true, "El turno es obligatorio."],
      enum: {
        values: ["Mañana", "Tarde", "Noche"],
        message: "El turno no es válido.",
      },
    },
    personas: {
      type: Number,
      required: [true, "La cantidad de personas es obligatoria."],
      min: [1, "El mínimo de personas es 1."],
      max: [6, "El máximo de personas es 6."],
      validate: {
        validator: Number.isInteger,
        message: "La cantidad de personas debe ser un número entero.",
      },
    },
    estado: {
      type: String,
      enum: ["pendiente", "confirmada"],
      default: "pendiente",
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

const Reserva = mongoose.model("Reserva", reservaSchema, "reservas");

module.exports = Reserva;