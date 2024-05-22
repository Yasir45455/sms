import axios from "../../Api/Axios";
import * as axiosUrls from '../../Api/AxiosUrls'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function MyProfile() {
    const [newPassword, setNewPassword] = useState([])

    const handlNewPassword = (e) => {
        setNewPassword(e.target.value)
    }
    let studentId = localStorage.getItem("studentID");
    // studentId = parseInt(studentId); // Convert to number
    studentId = studentId.replace(/^"(.*)"$/, '$1');
    const [StudentData, setStudentData] = useState([]);

    const fetchStudentsData = async () => {
        try {
            const response = await axios.get(axiosUrls.StudentsList);
            if (Array.isArray(response.data)) {
                setStudentData(response.data);
            } else {
                console.log("API response is not an array:");
                setStudentData(response.data.Student);
                console.log(response.data.Student)
            }
        } catch (error) {
            console.log("Error fetching Student data:", error);
        }
    };

    useEffect(() => {
        fetchStudentsData();
    }, []);

    const handleUpdate = async(e) => {
        e.preventDefault();
        if (newPassword === '') {
            toast.error("Please Enter New Password")
            return;
        }

        try {
            const response = await axios.put(`${axiosUrls.updateStudents}/${studentId}`, {
                password: newPassword,
            });
            toast.success("Password Updated", {
                autoClose: 1000, // 5 seconds
            });            // Optionally, you can show a success message or perform any other action after successful update
        } catch (error) {
            console.error("Error updating student data:", error);
            toast.error("Error updating Password:", {
                autoClose: 1000, // 5 seconds
            });
            // Optionally, you can show an error message or perform any other action if update fails
        }
    };

    return (
        <div className="container">
            {StudentData.map((student, index) => {
                if (student._id === studentId) {
                    return (
                        <div key={index} className="card p-4 mt-5" >
                            <h2 className="card-title text-center mb-4">My Profile</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" className="form-control" id="name" value={student.full_name} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" className="form-control" id="email" value={student.email} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="oldPassword">Old Password:</label>
                                    <input type="text" className="form-control" id="oldPassword" value={student.password} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password:</label>
                                    <input type="text" className="form-control" id="newPassword" required onChange={handlNewPassword} />
                                </div>
                                <button type="button" className="btn btn-primary btn-block mt-4" onClick={handleUpdate}>Update</button>
                            </form>
                        </div>
                    );
                }
                return null; // If condition fails, return null to satisfy React requirements
            })}
        </div>

    );
}
