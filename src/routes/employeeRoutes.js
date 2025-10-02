const express = require('express');

const { body, param, query} = require('express-validator');

const {
  listEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeByQuery
} = require('../controllers/employeeController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Employee route');
});

router.get("/employees", listEmployees);



module.exports = router;