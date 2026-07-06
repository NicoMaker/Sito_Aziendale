require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const contattiRoutes = require('./routes/contatti');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File statici (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Route per il form contatti
app.use('/api', contattiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, status: 'online' });
});

// Gestione errori centralizzata (deve essere dopo tutte le route)
app.use(errorHandler);

module.exports = app;