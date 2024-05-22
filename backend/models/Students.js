import mongoose from "mongoose";
const studentsSchema = new mongoose.Schema(
    {
        full_name:{type: String},
        phone:{type:String},
        email: { type: String, required: true, unique: true },
        address:{type:String},
        dateofbirth:{type: String },  
        fathername:{type: String },  
        fatherphone:{type: String },  
        program:{type: String },  
        adminssiondate:{type:String},
        courses: { type: [String] },
        password: { type: String } 
        // Array of strings to store course names

    },
    {
        timestamps: true
    })
const StudentsModels = mongoose.model("students", studentsSchema)
export default StudentsModels;