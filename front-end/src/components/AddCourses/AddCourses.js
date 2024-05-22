import React, { useState } from 'react';
import axios from "../../Api/Axios";
import * as axiosUrls from '../../Api/AxiosUrls'
import back from '../../assets/back.svg'
import image from '../../assets/image.svg'

export default function AddCourses() {
    const [formData, setFormData] = useState({
        coursename:"",
        credithours:"",
        coursedescription:"",
        courseImage:null,
    });

    const {
        coursename,
        credithours,
        coursedescription,
        courseImage,
       
    } = formData;

    const handleChange = (e) => {
        if(e.target.name === 'courseImage') {
            setFormData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.files[0] // Use e.target.files to access the file
            }));
        } else {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(formData).some(value => value === '')) {
            console.log("Please fill all fields");
            return;
        }
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('coursename', coursename);
            formDataToSend.append('credithours', credithours);
            formDataToSend.append('coursedescription', coursedescription);
            formDataToSend.append('courseImage', courseImage);
            const result = await axios.post(axiosUrls.AddCourse, formDataToSend);
            console.log("**********", formDataToSend);
            console.log("Welcome" + result.data);
        } catch (error) {
            console.log("OH Error" + error);
        }
    };

    return (
        <div className="container mt-5">
            <div className='py-1 d-flex flex-wrap gap-3'>
                <img src={back} alt="Back" />
                <h4 className='p-0 m-0 text-white'>Add New Course</h4>
            </div>
            <form className="row g-3" onSubmit={handleSubmit} >
                <div className="mt-3 row">
                    <div className="col-md-6">
                        <label htmlFor="coursename" className="form-label">Course Name:</label>
                        <input required onChange={handleChange} type="text" name="coursename" value={coursename} className="form-control text-white" style={{ backgroundColor: 'transparent', border: '1px solid white' }} placeholder="Dummy Text" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="credithours" className="form-label">Credit hours</label>
                        <input required onChange={handleChange} type="text" id="credithours" name="credithours" value={credithours} className="form-control text-white" style={{ backgroundColor: 'transparent', border: '1px solid white' }} placeholder="Dummy Text" />
                    </div>
                </div>
                <div className="col-md-6 mt-4">
                    <label htmlFor="courseImage" className="form-label">Course Image:</label>
                    <div className="text-center border w-100 p-3 m-0 rounded-3">
                        <label htmlFor="fileInput" className="p-1 px-2 text-danger" style={{ cursor: "pointer" }}>
                            <img src={image} alt="Upload" />
                            <input onChange={handleChange} type="file" id="fileInput" name='courseImage' className='rounded-3' style={{ display: "none" }} />
                        </label>
                    </div>
                </div>
                <div className="mt-3 row">
                    <div className="col-md-12">
                        <label htmlFor="coursedescription" className="form-label">Description:</label>
                        <textarea onChange={handleChange} id="coursedescription" name="coursedescription" value={coursedescription} className="form-control p-4 text-white" style={{ backgroundColor: 'transparent', border: '1px solid white' }} placeholder="Enter Description"></textarea>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-12 text-center">
                        <button type="submit" className="btn bg-white" style={{ width: "300px" }}>Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
