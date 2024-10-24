const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Importa la función directamente
const clientRoutes = require('./routes/clientRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://frontendprogiii.vercel.app', // Reemplaza esto con tu URL de frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true // Si necesitas permitir cookies
}));

app.use(express.json());
app.use('/api/clients', clientRoutes);

// Conectar a la base de datos y arrancar el servidor
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });
