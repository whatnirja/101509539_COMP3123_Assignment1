const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    salary : {
        type: Number,
        required: true,
        min: 0
    },
    date_of_joining: {
        type: Date,
        default: Date.now,
        required: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    updated_at: {
        type: Date,
        default: Date.now
    }
});

employeeSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

model.exports = mongoose.model('Employee', employeeSchema);
  