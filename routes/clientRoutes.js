// routes/clientRoutes.js
const express = require('express');
const Client = require('../models/Client.js');
const router = express.Router();

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
  const client = new Client({
    name: req.body.name,
    email: req.body.email,
  });
  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

    client.name = req.body.name;
    client.email = req.body.email;

    const updatedClient = await client.save();
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
