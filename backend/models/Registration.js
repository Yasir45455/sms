import mongoose from "mongoose";
const regiterationSchema = new mongoose.Schema(
    {
        full_name:{type: String},
        email:{type:String},
        password:{type:String},
        cpassword:{type:String},
    },
    {
        timestamps: true
    })
const regiterationModels = mongoose.model("regiteration", regiterationSchema)
export default regiterationModels;