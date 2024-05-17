require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const Employee = require('./models/Employee');

const PORT = process.env.PORT || 8080; 
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    const { name, title, department, hireDate } = req.body;
    if (!name || !title || !department || !hireDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newEmployee = new Employee({ name, title, department, hireDate });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/employees/:id', async (req, res) => {
  try {
    const { name, title, department, hireDate } = req.body;
    if (!name || !title || !department || !hireDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, title, department, hireDate },
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});