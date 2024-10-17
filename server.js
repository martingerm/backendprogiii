// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Importa la conexión de la base de datos
const clientRoutes = require('./routes/clientRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/clients', clientRoutes);

// Conectar a la base de datos y arrancar el servidor
connectDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
