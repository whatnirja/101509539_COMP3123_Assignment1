const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/users', require('./src/routes/userRoutes'));

app.use('/api/v1/employees', require('./src/routes/employeeRoutes'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get("/test-models", async (req, res) => {
  const User = require("./src/models/User");
  const Employee = require("./src/models/Employee");
  res.json({ models: [User.modelName, Employee.modelName] });
});
