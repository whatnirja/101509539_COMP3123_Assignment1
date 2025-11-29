const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express(); // initializing express
app.use(cors()); // used to enable CORS that allows cross-origin requests from different domains

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// routes
app.use('/api/v1/user', require('./src/routes/userRoutes'));
app.use('/api/v1/emp', require('./src/routes/employeeRoutes'));

app.get('/test-models', async (_req, res) => {
  const User = require('./src/models/User');
  const Employee = require('./src/models/Employee');
  res.json({ models: [User.modelName, Employee.modelName] });
});

// health
app.get('/ping', (_req, res) => res.send('pong'));
app.get('/', (_req, res) => res.send('API is running...'));

// 404
app.use((req, res) => {
  res.status(404).json({ status: false, message: 'Route not found' });
});

//uploads 
app.use('/uploads', express.static('uploads'));

module.exports = app;

// local-only listener
if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  });
}
