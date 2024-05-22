import React, { useState } from 'react';
import image from '../../assets/image.svg'
import axios from "../../Api/Axios";
import * as axiosUrls from '../../Api/AxiosUrls'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function StudentForm() {
    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        dateofbirth: "",
        address: "",
        email: "",
        fathername: "",
        fatherphone: "",
        program: "",
        adminssiondate: "",
    });

    const {
        full_name,
        phone,
        dateofbirth,
        address,
        email,
        fathername,
        fatherphone,
        program,
        adminssiondate,
    } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if input fields are empty
        if (Object.values(formData).some(value => value === '')) {
            toast.error("Please fill all fields", {
                autoClose: 1000, // 5 seconds
            });
            return;
        }
        try {
            const result = await axios.post(axiosUrls.AddStudents, formData);
            toast.success("Student Created Successfully", {
                autoClose: 1000, // 5 seconds
            });
            console.log("**********", formData);
            console.log("Welcome" + result.data);
        } catch (error) {
            toast.error("Error creating student", {
                autoClose: 1000, // 5 seconds
            });
        }
    };


    return (
        <>
            <div className="container mt-5">
                <div className='d-flex flex-wrap justify-content-between'>
                    <h3 className='p-0 m-0'>Students Enrollment</h3>
                </div>

                <form onSubmit={handleSubmit} className="container mt-5 students-form">
                    <div className="mt-3 row">
                        <div className="col-md-6">
                            <label htmlFor="full_name" className="form-label">Full Name:</label>
                            <input required type="text" id="full_name" name="full_name" value={full_name} onChange={handleChange} className="form-control text-white" style={{ backgroundColor: 'transparent', border: '1px solid white' }} placeholder="Full Name" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="phone" className="form-label">Phone:</label>
                            <input required type="text" id="phone" name="phone" value={phone} onChange={handleChange} className="form-control text-white" style={{ backgroundColor: 'transparent', border: '1px solid white' }} placeholder="Phone" />
                        </div>
                    </div>
                    <div className="mt-3 row">
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input required type="email" id="email" name="email" value={email} onChange={handleChange} className="form-control text-white" style={{ backgroundColor: 'transparent', border: '1px solid white' }} placeholder="Email" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="program" className="form-label">Class/Grade:</label>
                            <input required type="text" id="program" name="program" value={program} onChange={handleChange} className="form-control text-white" style={{ backgroundColor: 'transparent', border: '1px solid white' }} placeholder="Grade" />
                        </div>
                    </div>
                    <div className="mt-3 row">
                        <div className="col-md-6">
                            <label htmlFor="admission_date" className="form-label">Admission Date:</label>
                            <input required type="date" id="adminssiondate" name="adminssiondate" value={adminssiondate} onChange={handleChange} className="form-control text-white" style={{ backgroundColor: 'transparent', border: '1px solid white' }} placeholder="Admission Date" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="address" className="form-label">Address:</label>
                            <input required type="text" id="address" name="address" value={address} onChange={handleChange} className="form-control text-white" style={{ backgroundColor: 'transparent', border: '1px solid white' }} placeholder="Address" />
                        </div>
                    </div>
                    <div className="mt-3 row">
                        <div className="col-md-6">
                            <label htmlFor="dob" className="form-label">Date of Birth:</label>
                            <input required type="date" id="dateofbirth" name="dateofbirth" value={dateofbirth} onChange={handleChange} className="form-control text-white" style={{ backgroundColor: 'transparent', border: '1px solid white' }} placeholder="Date of Birth" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="father_name" className="form-label">Father's Name:</label>
                            <input required type="text" id="fathername" name="fathername" value={fathername} onChange={handleChange} className="form-control text-white" style={{ backgroundColor: 'transparent', border: '1px solid white' }} placeholder="Father's Name" />
                        </div>
                    </div>
                    <div className="mt-3 row">
                        <div className="col-md-6">
                            <label htmlFor="father_phone" className="form-label">Father's Phone:</label>
                            <input required type="text" id="fatherphone" name="fatherphone" value={fatherphone} onChange={handleChange} className="form-control text-white" style={{ backgroundColor: 'transparent', border: '1px solid white' }} placeholder="Father's Phone" />
                        </div>

                    </div>

                    <div className="row mt-5">
                        <div className="col-md-12 text-center">
                            <button type="submit"
                                className="btn bg-white" style={{ width: "300px" }}>Save</button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    );
}

export default StudentForm;
