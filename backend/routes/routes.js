import express from "express"
import multer from 'multer';
import { CreateStudent,GetStudent,deleteStudent,UpdateStudent,StudentLogin} from "../controller/StudentsContorller.js"
import { CreateCourse, GetCourse, deleteCourse} from "../controller/CoursesController.js"
import { CreateRegistration } from "../controller/RegisterationController.js"
import { AdminLogin } from "../controller/LoginController.js"

const upload = multer({ dest: 'uploads/' });

// import { CreateStudent, GetStudent, UpdateStudent,deleteStudent,StudentLogin } from "../controller/StudentController.js"
const routers = express.Router()
// Registraion API

routers.post("/register", CreateRegistration)
routers.post("/login", AdminLogin)
routers.post ('/student/login', StudentLogin);


// Student CRUD Routes
routers.post("/create", CreateStudent)
routers.get("/get", GetStudent)
routers.put("/update/:id", UpdateStudent)
routers.delete("/delete/:id", deleteStudent)

// Courses routes
routers.post("/create/course", upload.single('courseImage'), CreateCourse);
routers.get("/get/course", GetCourse)
routers.delete("/delete/course/:id", deleteCourse)
// Student Login API route
// routers.post ('/login', StudentLogin);

export default routers;