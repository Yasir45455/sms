import React, { useState, useEffect } from 'react';
import axios from "../../Api/Axios";
import * as axiosUrls from '../../Api/AxiosUrls';
export default function AssignCourses() {
    // State for selected options
    const [selectedOptionStudents, setSelectedOptionStudents] = useState('All');

    const [StudentData, setStudentData] = useState([]);

    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleSelectChangeStudent = (e) => {
        const selectedId = e.target.selectedOptions[0].getAttribute('data-id');
        setSelectedOptionStudents(selectedId);
        console.log("Selected option ID:", selectedId);
    };
    // Function to handle select box change
    const handleSelectChange = (e) => {
        const selectedId = e.target.selectedOptions[0].getAttribute('data-id');
        const selectedName = e.target.value;
        const newOption = { id: selectedId, name: selectedName };
    
        // Check if the selected option name already exists in the array
        const isOptionExists = selectedOptions.some(option => option.name === selectedName);
    
        if (!isOptionExists) {
            // Add the new option only if it doesn't exist already
            setSelectedOptions([...selectedOptions, newOption]);
            console.log("Selected options:", [...selectedOptions, newOption]);
        } else {
            console.log("Option already selected:", newOption);
        }
    };
    const handleRemoveOption = (option) => {
        const updatedOptions = selectedOptions.filter(item => item !== option);
        setSelectedOptions(updatedOptions);
        console.log("Remaining options:", updatedOptions);
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("**", selectedOptionStudents)
        if (selectedOptionStudents === "All") {
            return;
        }
        try {
            const response = axios.put(`${axiosUrls.updateStudents}/${selectedOptionStudents}`, {
                courses: selectedOptions.map(option => option.name),
            });
            console.log("Update successful:", response.data);
            // Optionally, you can show a success message or perform any other action after successful update
        } catch (error) {
            console.error("Error updating student data:", error);
            // Optionally, you can show an error message or perform any other action if update fails
        }
    };
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
        fetchCoursesData();
        fetchStudentsData();
    }, []);
    useEffect(() => {
        const names = CourseData.map(course => course.coursename);
        const uniqueNames = [...new Set(names)]; // Filter out unique course names
        setCourseNames(uniqueNames);
    }, [CourseData]);
    // const handleSelectChange = (e) => {
    //     setSelectedCourse(e.target.value);
    // };
    return (
        <div>
            <div className="container mt-5">
                <div className='py-1 d-flex flex-wrap justify-content-between'>
                    <h3 className='p-0 m-0 text-start'>Assign Courses</h3>
                </div>
                <div className='w-100 mt-5 d-flex flex-column justify-content-center align-items-center'>
                    <div>
                        <h4 className='p-0 m-0 mb-2'>Select a Student</h4>
                        <div>
                            <select className="form-select" style={{ width: "400px" }} onChange={handleSelectChangeStudent}>
                                <option value="All">All</option>
                                {StudentData.map((row, index) => (
                                    <option key={row._id} data-id={row._id}>{row.full_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h4 className='p-0 m-0 text-start'>Select Courses</h4>
                        <select className="form-select" style={{ width: "400px" }} onChange={handleSelectChange}>
                            {courseNames.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='border mt-4 p-1 py-2 rounded bg-white text-dark' style={{ minWidth: "400px", maxWidth: "500px", minHeight: "200px" }}>
                        {/* Display selected options */}
                        {selectedOptions.length === 0 ? (
                            <h6 style={{ opacity: "0.7" }}>No Course Selected</h6>
                        ) : (
                            selectedOptions.map((option, index) => (
                                <span className='bg-primary mx-1 p-1 px-2 rounded-4 text-white' key={index}>
                                    <span className='me-2'>
                                        {option.name}
                                    </span>
                                    <a style={{ cursor: "pointer" }} onClick={() => handleRemoveOption(option)}>&#10060;</a>
                                </span>
                            ))
                        )}
                    </div>
                    <div className='py-3 mt-3'>
                        <button className="btn btn-white bg-white text-dark" style={{ width: "400px" }} onClick={handleUpdate}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
