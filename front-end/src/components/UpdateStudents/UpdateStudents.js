import axios from "../../Api/Axios";
import * as axiosUrls from '../../Api/AxiosUrls';
import React, { useState, useEffect } from 'react';

export default function UpdateStudents({ id }) {


    const [studentData, setStudentData] = useState([]);

    const fetchStudentData = async () => {
        try {
            const response = await axios.get(axiosUrls.StudentsList);
            if (Array.isArray(response.data.Student)) {
                setStudentData(response.data.Student);
            } else {
                setStudentData([response.data.Student]);
            }
        } catch (error) {
            console.log("Error fetching Student data:", error);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);
    const [rowData, setRowData] = useState({});

    const handleInputChange = (e, studentId) => {
        const { name, value } = e.target;
        setRowData({ ...rowData, [name]: value });

        // Find the student data with the matching ID and update the corresponding field
        const updatedStudentData = studentData.map((student) => {
            if (student._id === studentId) {
                return {
                    ...student,
                    [name]: value
                };
            }
            return student;
        });
        setStudentData(updatedStudentData); // Update the student data state

    };

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("********", rowData)
        try {
            const response = axios.put(`${axiosUrls.updateStudents}/${id}`, {
                full_name: rowData.full_name,
                phone: rowData.phone,
                dateofbirth: rowData.dateofbirth,
                address: rowData.address,
                email: rowData.email,
                fathername: rowData.fathername,
                fatherphone: rowData.fatherphone,
                program: rowData.program,
                adminssiondate: rowData.adminssiondate,
            });
            console.log("Update successful:", response.data);
            // Optionally, you can show a success message or perform any other action after successful update
        } catch (error) {
            console.error("Error updating student data:", error);
            // Optionally, you can show an error message or perform any other action if update fails
        }
    };
    return (
        <div className="container mt-5">
            <div className='d-flex flex-wrap justify-content-between'>
                <h3 className='p-0 m-0'>Edit Student Information</h3>
            </div>
            {studentData.map((row) => {
                if (row._id === id) {
                    return (
                        <form key={row.id} className="container mt-5 students-form">
                            <div className="mt-3 row">
                                <div className="col-md-6">
                                    <label htmlFor="full_name" className="form-label">Full Name:</label>
                                    <input type="text" id="full_name" name="full_name" className="form-control" onChange={(e) => handleInputChange(e, row._id)} value={row.full_name} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="phone" className="form-label">Phone:</label>
                                    <input type="text" id="phone" name="phone" className="form-control" onChange={(e) => handleInputChange(e, row._id)} value={row.phone} />
                                </div>
                            </div>
                            <div className="mt-3 row">
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input type="email" id="email" name="email" className="form-control" onChange={(e) => handleInputChange(e, row._id)} value={row.email} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="address" className="form-label">Address:</label>
                                    <input type="text" id="address" name="address" className="form-control" onChange={(e) => handleInputChange(e, row._id)} value={row.address} />
                                </div>
                            </div>
                            <div className="mt-3 row">
                                <div className="col-md-6">
                                    <label htmlFor="dateofbirth" className="form-label">Date of Birth:</label>
                                    <input type="date" id="dateofbirth" name="dateofbirth" className="form-control" onChange={(e) => handleInputChange(e, row._id)} value={row.dateofbirth} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="fathername" className="form-label">Father's Name:</label>
                                    <input type="text" id="fathername" name="fathername" className="form-control" onChange={(e) => handleInputChange(e, row._id)} value={row.fathername} />
                                </div>
                            </div>
                            <div className="mt-3 row">
                                <div className="col-md-6">
                                    <label htmlFor="fatherphone" className="form-label">Father's Phone:</label>
                                    <input type="text" id="fatherphone" name="fatherphone" className="form-control" onChange={(e) => handleInputChange(e, row._id)} value={row.fatherphone} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="program" className="form-label">Program:</label>
                                    <input type="text" id="program" name="program" className="form-control" onChange={(e) => handleInputChange(e, row._id)} value={row.program} />
                                </div>
                            </div>
                            <div className="mt-3 row">
                                <div className="col-md-6">
                                    <label htmlFor="adminssiondate" className="form-label">Admission Date:</label>
                                    <input type="date" id="adminssiondate" name="adminssiondate" className="form-control" onChange={(e) => handleInputChange(e, row._id)} value={row.adminssiondate} />
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-12 text-center">
                                    <button
                                        className="btn bg-white" style={{ width: "300px" }} onClick={handleUpdate}>Update</button>
                                </div>
                            </div>
                        </form>
                    );
                }
                return null; // Skip rendering if ID doesn't match
            })}
        </div>
    );
}
