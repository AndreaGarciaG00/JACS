const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
var cookieParser = require('cookie-parser');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require("xss-clean");
const rateLimit = require('express-rate-limit')
const hpp = require('hpp');

// Agregar configuración de socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const errorHandler = require('./middleware/error');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const postRoute = require('./routes/postRoute');
const podcastRoutes = require('./routes/podcastRoutes');
const eventRoutes = require('./routes/eventRoutes');
const collaboratorRoutes = require('./routes/colaboradorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const testimonialRoutes = require('./routes/testimonioRoutes');
const psychologistRoutes = require('./routes/psicologoRoutes');

// Conexión a la base de datos
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log("MongoAtlas Conectado"))
  .catch((err) => console.log(err));

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));
app.use(cookieParser());
app.use(cors());

// Evitar inyecciones de SQL
app.use(mongoSanitize());
// Agregar encabezados de seguridad
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
);
// Evitar ataques de Cross-site Scripting (XSS)
app.use(xss());
// Limitar solicitudes por 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limitar cada IP a 100 solicitudes por ventana (aquí, por 15 minutos)
  standardHeaders: true, // Devolver información de límite de tasa en los encabezados `RateLimit-*`
  legacyHeaders: false, // Desactivar los encabezados `X-RateLimit-*`
});
app.use(limiter);
// Evitar la contaminación de parámetros HTTP
app.use(hpp());

// RUTAS MIDDLEWARE
app.use('/api', authRoutes);
app.use('/api', postRoute);
app.use('/api', podcastRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/v1/collaborators',collaboratorRoutes);
app.use('/api/v1/books',bookRoutes);
app.use('/api/v1/testimonials',testimonialRoutes);
app.use('/api/v1/psychologists', psychologistRoutes);

__dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Middleware de manejo de errores
app.use(errorHandler);

// Puerto
const port = process.env.PORT || 9000;

// app.listen(port, () => {
//     console.log(` Server running on port ${port}`);
// })
io.on('connection', (socket) => {
  //console.log('a user connected', socket.id);
  socket.on('comment', (msg) => {
    // console.log('new comment received', msg);
    io.emit("new-comment", msg);
  });
});

exports.io = io;

server.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
