const express = require('express');

const auth = require('../middleware/authMiddleware');

const { body, param, query} = require('express-validator');

const {
  listEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeByQuery
} = require('../controllers/employeeController');

const router = express.Router();
router.use(auth); // applying authentication middleware to all routes

router.get('/', (req, res) => {
  res.send('Employee route');
});

router.get("/employees", listEmployees);

router.post(
  '/employees',
  [
    body('first_name').trim().notEmpty().withMessage('First name is required'),
    body('last_name').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('position').trim().notEmpty().withMessage('Position is required'),
    body('salary').isNumeric().withMessage('Salary must be a number'),
    body('date_of_joining').isISO8601().withMessage('Date of joining is required'),
    body('department').trim().notEmpty().withMessage('Department is required'),
  ],
  createEmployee
);


router.get(
  '/employees/:id',
  [
    param('id').isMongoId().withMessage('Invalid employee ID')
  ],
  getEmployeeById
);

router.put(
  '/employees/:id',
  [
    param("id").isMongoId().withMessage("Invalid employee ID"),
    body('first_name').optional().trim().notEmpty(),
    body('last_name').optional().trim().notEmpty(),
    body("email").optional().isEmail(),
    body("salary").optional().isNumeric(),
    body("position").optional().isString(),
    body("date_of_joining").optional().isISO8601().toDate(),
    body("department").optional().isString()
  ],
  updateEmployeeById
);

router.delete(
  '/employees',
  [
    query('eid').isMongoId().withMessage('Invalid employee ID')
  ],
  deleteEmployeeByQuery
);


module.exports = router;