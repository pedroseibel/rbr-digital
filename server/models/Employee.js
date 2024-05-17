const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    hireDate: { type: Date, required: true },
});

module.exports = mongoose.model('Employee', EmployeeSchema);