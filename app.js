require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport')(passport);
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: true,
  }
})
require('./socket.io/socketIO')(io);

const authRoutes = require('./routes/authRoutes');
const clothesRoutes = require('./routes/clothesRoutes');
const enumRoutes = require('./routes/enumRoutes');
const deviceTokensRoutes = require('./routes/deviceTokensRoutes');
const { authenticate } = require('./config/authenticate');

const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions).then(() => {
  console.log(`[${new Date().toLocaleString()}] Connected to database`);
}).catch(err => {
  console.log(`[${new Date().toLocaleString()}] Database connection error: ${err}`);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
  origin: true,
}));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Smart wardrobe API',
    },
    basePath: '/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['app.js', 'routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/auth', authRoutes);
app.use('/enums', enumRoutes);
app.use('/clothes', authenticate, clothesRoutes);
app.use('/device-tokens', authenticate, deviceTokensRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`[${new Date().toLocaleString()}] Listening on ${PORT}`);
})