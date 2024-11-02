const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes');
const turistaRoutes = require('./routes/turistaRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const vueloRoutes = require('./routes/vueloRoutes');
const claseRoutes = require('./routes/claseRoutes');
const hospedajeRoutes = require('./routes/hospedajeRoutes');
const turistaVueloRoutes = require('./routes/turistaVueloRoutes');
const turistaHotelRoutes = require('./routes/turistaHotelRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/sucursales', sucursalRoutes);
app.use('/turistas', turistaRoutes);
app.use('/hoteles', hotelRoutes);
app.use('/vuelos', vueloRoutes);
app.use('/clases', claseRoutes);
app.use('/hospedajes', hospedajeRoutes);
app.use('/turista-vuelo', turistaVueloRoutes);
app.use('/turista-hotel', turistaHotelRoutes);

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
