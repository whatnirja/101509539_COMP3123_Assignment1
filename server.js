const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});


app.use('/api/v1/user', require('./src/routes/userRoutes'));

app.use('/api/v1/emp', require('./src/routes/employeeRoutes'));

app.get("/test-models", async (req, res) => {
  const User = require("./src/models/User");
  const Employee = require("./src/models/Employee");
  res.json({ models: [User.modelName, Employee.modelName] });
});

//fallback route
app.use((req, res) => {
  res.status(404).json({ status: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


//debugging route
app.get('/ping', (req, res) => {
  console.log('✅ Ping route hit');
  res.send('pong');
});

module.exports = app