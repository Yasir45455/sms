import axios from "../../Api/Axios";
import * as axiosUrls from '../../Api/AxiosUrls'
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import xlsx
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Students.css"

export function StudentsList({ onItemClick, StudentData, setStudentData }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const [searchQuery, setSearchQuery] = useState('');

    // State to store the expanded row id
    const [expandedRowId, setExpandedRowId] = useState(null);

    // Function to toggle the expanded state for a specific row
    const handleRowToggle = (id) => {

        console.log(id)
        setExpandedRowId(prevId => prevId === id ? null : id);
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
                console.log("Courses:");
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
        const selectedCourse = e.target.value;
        setSelectedCourse(selectedCourse);
    };
    const handleDelete = (id) => {
        console.log(id);
        console.log(axiosUrls.deleteStudent);
        axios.delete(`${axiosUrls.deleteStudent}/${id}`)
            .then(result => {
                console.log("Record deleted successfully.");
                // Remove the deleted record from the list
                const updatedStudentData = StudentData.filter(student => student._id !== id);
                setStudentData(updatedStudentData);
            })
            .catch(error => {
                console.log("Error deleting record:", error);
            });
    };


    const filteredData = StudentData.filter(student => {
        // Filter by name
        const nameFilter = student.full_name.toLowerCase().includes(searchQuery.toLowerCase());
        // Filter by selected course
        const courseFilter = selectedCourse === 'All' || student.courses.includes(selectedCourse);
        return nameFilter && courseFilter;
    });


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => {
        if (pageNumber < 1) {
            setCurrentPage(1);
        } else if (pageNumber > Math.ceil(filteredData.length / itemsPerPage)) {
            setCurrentPage(Math.ceil(filteredData.length / itemsPerPage));
        } else {
            setCurrentPage(pageNumber);
        }
    };
    const handleExport = () => {
        const ws = XLSX.utils.table_to_sheet(document.getElementById('studentTable'));
        const wb = XLSX.utils.book_new();
        console.log("***", ws)
        console.log("***", wb)
        XLSX.utils.book_append_sheet(wb, ws, "Students");
        XLSX.writeFile(wb, "students.xlsx");
    };
    return (
        <div className="container mt-5">
            <div className='py-1 d-flex flex-wrap justify-content-between'>
                <h3 className='p-0 m-0 mb-4'>Students List</h3>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className='mt-5'>
                    <h4 className='p-0 m-0 text-start'>Search by Course</h4>
                    <select className="form-select" style={{ width: "400px" }} onChange={handleSelectChange}>
                       <option>All</option>
                        {courseNames.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <br></br>

            <table className='custom-table' id="studentTable">
                <thead>
                    <tr>
                        <th></th>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Admission Date</th>
                        <th>DOB</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row, index) => (
                        <React.Fragment key={row._id}>
                            <tr>
                                <td>
                                    {/* <button
                                        className="btn btn-sm"
                                        onClick={() => handleRowToggle(row.id)}
                                    >
                                        {expandedRowId === row.id ? '-' : '+'}
                                    </button> */}
                                    <button
                                        className="btn btn-sm text-white rounded-circle"

                                        onClick={() => {
                                            console.log("Row object:", row);
                                            handleRowToggle(row._id);
                                        }}
                                    >
                                        {expandedRowId === row._id ? '-' : '+'}
                                    </button>

                                </td>
                                <td>{row.full_name}</td>
                                <td>{row.phone}</td>
                                <td>{row.email}</td>
                                <td>{row.program}</td>
                                <td>{row.adminssiondate}</td>
                                <td>{row.dateofbirth}</td>
                                <td>
                                    <i className="fas fa-edit" style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() =>

                                        onItemClick('UpdateStudents', row._id)} ></i>

                                    <i className="fas fa-trash" style={{ cursor: 'pointer' }} onClick={() => handleDelete(row._id)} ></i>
                                </td>
                            </tr>
                            {/* Render additional details here only for the expanded row */}
                            {expandedRowId === row._id && (
                                <tr>
                                    <td colSpan="8">
                                        <div className="p-2">
                                            <h5>Additional details:</h5>
                                            <div>
                                                <p className="m-0 p-0"><b> Father Name: </b> <span style={{ opacity: "0.7" }}>  {row.fathername}  </span> </p>
                                                <p className="m-0 p-0"><b> Father's Phone: </b> <span style={{ opacity: "0.7" }}>  {row.fatherphone} </span> </p>
                                                <p className="m-0 p-0"><b> Address: </b> <span style={{ opacity: "0.7" }}>  {row.address} </span> </p>
                                                <p className="m-0 p-0"><b> Enrolled In: </b> <span style={{ opacity: "0.7" }}>  {row.courses.join(", ")} </span> </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {/* Export button */}
            <button onClick={handleExport}>Export to Excel</button>
            {/* Pagination */}
            <nav>
                <ul className="pagination d-flex justify-content-between mt-5">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(currentPage - 1)} className="text-white btn border">
                            Previous
                        </button>
                    </li>
                    <li className={`page-item ${currentPage === Math.ceil(StudentData.length / itemsPerPage) || StudentData.length === 0 ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(currentPage + 1)} className="text-white btn border">
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default function Students({ onItemClick }) {
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

    return (
        <>
            <StudentsList onItemClick={onItemClick} StudentData={StudentData} setStudentData={setStudentData} />
        </>
    )
}
