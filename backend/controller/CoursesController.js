import CoursesModels from "../models/Courses.js";
import multer from 'multer';
import path from 'path';

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // Set the file name
    }
});

const upload = multer({ storage: storage });

// Create Courses API
const CreateCourse = async (req, res) => {
    try {
        const { coursename, credithours, coursedescription } = req.body;
        
        // Check if a file is included in the request
        console.log("*********", req.file);

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        // Get the file path or URL (assuming it's stored locally)
        const courseImage = req.file.path;

        const NewCourse = CoursesModels({
            coursename, credithours, coursedescription, courseImage
        });

        await NewCourse.save();

        res.status(200).json({ success: true, message: 'Course created successfully', NewCourse });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Read Courses API
const GetCourse = async (req, res) => {
    try {
        const Course = await CoursesModels.find();
        if (Course.length === 0) {
            return res.status(404).json({ success: false, Message: "Course not found" })
        }
        res.status(200).json({ success: true, Course })
    } catch (error) {
        return res.status(500).json({ success: false, Message: "Internal Server Error", Course })

    }
}

// Delete Course API
const deleteCourse = async (req, res) => {
    try {
        const CourseId = req.params.id;
        const deletedCourse = await CoursesModels.findByIdAndDelete(CourseId, req.body,
            {
                new: true
            })
        if (!deletedCourse) {
            return res.status(404).json({ success: false, Message: "Course not found" })
        }
        res.status(200).json({ success: true, Message: "Course deleted", deletedCourse })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, Message: "Internal Server Error" })

    }
}

export { CreateCourse, GetCourse , deleteCourse}
