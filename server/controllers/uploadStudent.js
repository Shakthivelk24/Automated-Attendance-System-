import uploadOnCloudinary from "../config/cloudinary.js";
import Student from "../models/Student.js";

export const uploadStudent = async (req, res) => {
    const {name, rollNumber, classes, section} = req.body;
    try {
        let studentImageUrl = null;
        if(req.file){
            const result = await uploadOnCloudinary(req.file.path);
            studentImageUrl = result.secure_url;
        }
        const newStudent = new Student({
            name,
            rollNumber,
            classes,
            section,
            imageUrl: studentImageUrl
        })
        await newStudent.save();
        res.status(201).json({message: "Student uploaded successfully", student: newStudent});
    } catch (error) {
        console.error("Error uploading student:", error);
        res.status(500).json({message: "Failed to upload student", error: error.message});
    }
}