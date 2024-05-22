import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema(
    {
        coursename: { type: String },
        credithours: { type: String },
        coursedescription: { type: String },
        courseImage: { type: String } // Add courseImage field
    },
    {
        timestamps: true
    }
);

const CoursesModels = mongoose.model("Courses", coursesSchema);

export default CoursesModels;
