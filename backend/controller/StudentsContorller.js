import StudentModels from "../models/Students.js";
import Joi from "joi"
import jwt from "jsonwebtoken"

// Create Students API
const CreateStudent = async (req, res) => {
    try {

        
        const { full_name, phone, email, address, dateofbirth, fathername, fatherphone, program, adminssiondate, courses } = req.body;
        const emailUsername = email.split('@')[0];
        const password = emailUsername + '12345';
        const existingStudent = await StudentModels.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ success: false, Message: "Email already exists" });
        }

        const NewStudent = StudentModels({
            full_name, phone, email, address, dateofbirth, fathername, fatherphone, program, adminssiondate, courses, password
        })
        await NewStudent.save();
        res.status(200).json({ success: true, Message: "Student Created Successfully", NewStudent })
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ success: false, Message: "Internal Server Error" })
    }
}

// Update API
const UpdateStudent = async (req, res) => {
    try {
        const StudentId = req.params.id;
        const { courses, ...updateData } = req.body;
        const updatedStudent = await StudentModels.findByIdAndUpdate(
            StudentId,
            { ...updateData, $addToSet: { courses } }, // Add courses to student's existing courses
            { new: true }
        )
        if (!updatedStudent) {
            console.error("Student not found:", StudentId);

            return res.status(404).json({ success: false, Message: "Student not found" })
        }
        res.status(200).json({ success: true, Message: "Student Updated", updatedStudent })
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ success: false, Message: "Internal Server Error" })
    }
}

// Delete Student API
const deleteStudent = async (req, res) => {
    try {
        const StudentId = req.params.id;
        const deletedStudent = await StudentModels.findByIdAndDelete(StudentId)
        if (!deletedStudent) {
            return res.status(404).json({ success: false, Message: "Student not found" })
        }
        res.status(200).json({ success: true, Message: "Student deleted", deletedStudent })
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ success: false, Message: "Internal Server Error" })
    }
}

// Read Students API
const GetStudent = async (req, res) => {
    try {
        const Student = await StudentModels.find();
        if (Student.length === 0) {
            return res.status(404).json({ success: false, Message: "Student not found" })
        }
        res.status(200).json({ success: true, Student })
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ success: false, Message: "Internal Server Error" })
    }
}

// Student Login API creations
const StudentLogin = async (req, res, next) => {
    const StudentLoginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error } = StudentLoginSchema.validate(req.body);

    // Middleware
    if (error) {
        return next(error);
    }

    // Destructure email and password from the request body
    const { email, password } = req.body;

    try {
        // Find the student by email
        const student = await StudentModels.findOne({ email });

        if (!student) {
            const error = {
                status: 401,
                message: "Invalid Email or Password. Please try again!"
            };

            return next(error);
        }
        
        // Compare the provided password with the stored password
        if (password === student.password) {
            // Generate JWT token
            const token = jwt.sign({ email: student.email }, 'your_secret_key');

            // Save token to the database (you may have to adjust this according to your schema)
            student.token = token;
            await student.save();

            // Return success response with token and user details
            return res.status(200).json({ success: true, message: "Login successful", token, student });
        } else {
            return res.status(401).json({ success: false, message: "Invalid Email or Password" });
        }
    } catch (error) {
        return next(error);
    }
};


export { CreateStudent, GetStudent, deleteStudent, UpdateStudent, StudentLogin }
