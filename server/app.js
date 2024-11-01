const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes');
const turistaRoutes = require('./routes/turistaRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const vuelosRoutes = require('./routes/vuelosRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/sucursales', sucursalRoutes);
app.use('/turistas', turistaRoutes);
app.use('/hoteles', hotelRoutes);
app.use('/vuelos', vuelosRoutes);

async function startServer() {
  try {
    // await initialize(); // Inicializar la conexión a Oracle
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

startServer();

module.exports = app;
