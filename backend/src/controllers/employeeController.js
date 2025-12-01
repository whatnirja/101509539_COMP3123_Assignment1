const { validationResult, matchedData } = require('express-validator');
const Employee = require('../models/Employee');
const e = require('express');

const toResponse = (employee) => ({
  employee_id: employee._id,
  first_name: employee.first_name,
  last_name: employee.last_name,
  email: employee.email,
  position : employee.position,
  salary : employee.salary,
  date_of_joining : employee.date_of_joining,
  department : employee.department,
  profile_picture : employee.profile_picture,
});

exports.listEmployees = async (_req, res) => {
  try {
    const employees = await Employee.find().sort({ created_at : -1 });
    return res.status(200).json(employees.map(toResponse));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createEmployee = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  try {
    const data = matchedData(req, { locations: ['body'] });

    if (req.file) {
      data.profile_picture = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    const doc = await Employee.create(data);

    return res.status(201).json({ 
      message: "Employee created successfully.", 
      employee_id: doc._id.toString() 
    });
    
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).json({ status: false, message: "Employee email already exists" });
    }
    console.error(e);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Employee.findById(id);
    if (!doc) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json(toResponse(doc));
  } catch (err) {
    return res.status(500).json({ message: "Id is not valid" });
  } 
};


exports.updateEmployeeById = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  try {

    const { id } = req.params;
    const data = matchedData(req, { locations: ['body'] });

    if (req.file) {
      data.profile_picture = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    const doc = await Employee.findByIdAndUpdate(id, data, { new: true });

    if (!doc) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json(toResponse(doc));

  } catch (err) {

    return res.status(500).json({ message: err.message });

  } 
};

exports.deleteEmployeeByQuery = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, message: "Validation error", errors: errors.array() });
  }
  try {
    const { eid } = req.query;
    const deleted = await Employee.findByIdAndDelete(eid);
    if (!deleted) return res.status(404).json({ status: false, message: "Employee not found" });
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.searchEmployees = async (req, res) => {
  try {
    const { department, position } = req.query;
    const query = {};

    if (department) {
      query.department = { $regex: `^${department.trim()}`, $options: "i" };
    }

    if (position) {
      query.position = { $regex: `^${position.trim()}`, $options: "i" };
    }

    const employees = await Employee.find(query);

    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
