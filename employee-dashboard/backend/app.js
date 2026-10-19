
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dns = require('node:dns');
require('dotenv').config();

dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
// Task1: initiate app and run server at 3000

app.use(express.json());

// Keep the provided frontend path and also serve the actual Frontend folder.
app.use(express.static(path.join(__dirname, 'dist', 'FrontEnd')));
app.use(express.static(path.join(__dirname, 'dist', 'Frontend')));

// Task2: create mongoDB connection

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Employee schema
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

// Task 2: write API with error handling

// GET all employees
app.get('/api/employeelist', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single employee by ID
app.get('/api/employeelist/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid employee ID' });
        }

        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: add a new employee
app.post('/api/employeelist', async (req, res) => {
    try {
        const { name, location, position, salary } = req.body;

        const employee = new Employee({
            name,
            location,
            position,
            salary
        });

        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an employee by ID
app.delete('/api/employeelist/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid employee ID' });
        }

        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT: update an employee
app.put('/api/employeelist', async (req, res) => {
    try {
        // The frontend must send the employee ID with the update.
        const id = req.body._id || req.body.id;

        if (!id || !mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: 'A valid employee ID is required'
            });
        }

        const { name, location, position, salary } = req.body;

        const employee = await Employee.findByIdAndUpdate(
            id,
            { name, location, position, salary },
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Do not delete the provided frontend fallback code.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
