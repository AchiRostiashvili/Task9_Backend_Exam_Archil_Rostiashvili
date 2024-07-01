const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  pid: { type: String, required: true, unique: true },
  licenseActivationDate: { type: Date, required: true },
  serviceCheckList: [
    {
      serviceName: { type: String, required: true },
      date: { type: Date, required: true },
      result: { type: Boolean, required: true }
    }
  ]
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;