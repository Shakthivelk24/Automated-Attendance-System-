import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    classes:{
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;