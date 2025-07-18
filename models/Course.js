const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
    price: { type: Number, required: true, min: 0 }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }]
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);