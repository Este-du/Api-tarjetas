const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Datos en memoria (simula una base de datos)
let tarjetas = [
  {
    id: 1,
    imagen: "https://picsum.photos/200?random=1",
    texto: "Tarjeta de ejemplo 1",
  },
  {
    id: 2,
    imagen: "https://picsum.photos/200?random=2",
    texto: "Tarjeta de ejemplo 2",
  },
];

// 🔹 Obtener todas las tarjetas
app.get("/tarjetas", (req, res) => {
  res.json(tarjetas);
});

// 🔹 Crear una nueva tarjeta
app.post("/tarjetas", (req, res) => {
  const nueva = {
    id: Date.now(),
    imagen: req.body.imagen || "https://picsum.photos/200",
    texto: req.body.texto || "Nueva tarjeta",
  };
  tarjetas.push(nueva);
  res.status(201).json(nueva);
});

// 🔹 Eliminar una tarjeta
app.delete("/tarjetas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tarjetas = tarjetas.filter((t) => t.id !== id);
  res.json({ mensaje: "Tarjeta eliminada" });
});

// Servidor corriendo
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(" API de tarjetas funcionando. Usa /tarjetas para ver los datos.");
});

app.listen(PORT, () =>
  console.log(`API de tarjetas corriendo en http://localhost:${PORT}`)
);

