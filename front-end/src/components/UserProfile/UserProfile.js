import axios from "../../Api/Axios";
import * as axiosUrls from '../../Api/AxiosUrls'
import React, { useState, useEffect } from 'react';
export function CourseCard({ name, creditHours, description, image, StudentData }) {
    let studentId = localStorage.getItem("studentID");
    studentId = studentId.replace(/^"(.*)"$/, '$1');

    console.log("localStorage studentID:", studentId);
    return (
        <>
            {StudentData.map((student, index) => {
                if (student._id === studentId) {
                    return (
                        <div className="d-flex justify-content-start flex-wrap gap-3 ">
                            {student.courses.length === 0 ? (
                                <p className="p-4" >No Courses Yet</p>
                            ) : (
                                student.courses.map((course, courseIndex) => (
                                    <div className="border border-dark" key={courseIndex}>
                                        <div className="card border">
                                            <img src={image} className="card-img-top" alt={name} />
                                            <div className="card-body">
                                                <h5 className="card-title">{course}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    );
                }
                return null;
            })}
        </>
    );
}


export default function UserProfile() {

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
    // Dummy course data (replace with actual data)


    return (
        <div className="container mt-5">
            <h2 className="mb-4">My Courses</h2>
            <div className="row">

                <div >
                    <CourseCard
                        StudentData={StudentData}
                    />
                </div>

            </div>
        </div>
    );
}
