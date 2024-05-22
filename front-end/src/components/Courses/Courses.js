import React, { useState, useEffect } from 'react';
import axios from "../../Api/Axios";
import * as axiosUrls from '../../Api/AxiosUrls';
import img from '../../assets/english.png';

export function CourseCard({ CourseData, setCourseData, selectedCourse }) {
    const handleDelete = (id) => {
        console.log(id);
        console.log(axiosUrls.deleteCourse);
        axios.delete(`${axiosUrls.deleteCourse}/${id}`)
            .then(result => {
                console.log("Record deleted successfully.");
                // Remove the deleted record from the list
                const updatedCourseData = CourseData.filter(course => course._id !== id);
                setCourseData(updatedCourseData);
            })
            .catch(error => {
                console.log("Error deleting record:", error);
            });
    };

    return (
        <>
            {
                CourseData.filter(course => selectedCourse === 'All' || course.coursename === selectedCourse).map((row, index) => {
                    console.log(row); // Row data console per print karo
                    return (
                        <div className="card border-white mb-3 bg-transparent text-white" style={{ maxWidth: '18rem' }} key={row._id}>
                            <div className='border-0 border-bottom p-2 d-flex justify-content-between align-items-center'>
                                <div className="">Course Details</div>
                                <div className='px-2'>
                                    <button type="button" className="btn-close bg-white" aria-label="Close" onClick={() => handleDelete(row._id)}></button>
                                </div>
                            </div>
                            <div className="card-body text-white">
                                <img src={img} className="card-img-top rounded-2" alt="Placeholder" style={{ height: '200px', objectFit: 'cover' }} />
                                <div className='text-center py-3'>
                                    <h5 className="card-title">{row.coursename}</h5>
                                    <p className="card-text">{row.credithours}</p>
                                    <p className="card-text">{row.coursedescription}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
}

export default function Courses({ onItemClick }) {
    const [CourseData, setCourseData] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('All'); // State variable to hold the selected course name
    const [courseNames, setCourseNames] = useState([]); // State variable to hold unique course names

    const fetchCoursesData = async () => {
        try {
            const response = await axios.get(axiosUrls.CoursesList);
            if (Array.isArray(response.data)) {
                setCourseData(response.data);
            } else {
                console.log("API response is not an array:");
                setCourseData(response.data.Course);
                console.log(response.data.Course)
            }
        } catch (error) {
            console.log("Error fetching Course data:", error);
        }
    };

    useEffect(() => {
        fetchCoursesData();
    }, []);
    useEffect(() => {
        const names = CourseData.map(course => course.coursename);
        const uniqueNames = [...new Set(names)]; // Filter out unique course names
        setCourseNames(uniqueNames);
    }, [CourseData]);
    const handleSelectChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    return (
        <div className="container mt-5">
            <div className='py-1 d-flex flex-wrap justify-content-between'>
                <h3 className='p-0 m-0 '></h3>
                <div className='d-flex flex-wrap gap-3'>
                    <select className="form-select" style={{ width: "200px" }} onChange={handleSelectChange} value={selectedCourse}>
                        <option value="All">All</option>
                        {courseNames.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
                        ))}
                    </select>
                    <button className="btn bg-white" style={{ width: "200px" }} onClick={() => onItemClick('AddCourses')}>Add New Course</button>
                </div>
            </div>
            <br></br>
            <div className='mt-3'>
                <h3 className='py-2 mb-4'>Courses List</h3>
                <div className='d-flex justify-content-start gap-3 flex-wrap' style={{ maxHeight: "800px", overflowY: "auto" }}>
                    <CourseCard CourseData={CourseData} setCourseData={setCourseData} selectedCourse={selectedCourse} />
                </div>
            </div>
        </div>
    );
}
