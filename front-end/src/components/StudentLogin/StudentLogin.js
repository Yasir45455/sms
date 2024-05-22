import React, { useState, useEffect } from 'react';
import axios from "../../Api/Axios";
import * as axiosUrls from '../../Api/AxiosUrls';
export default function StudentLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if a token already exists in local storage
        const token = localStorage.getItem('token');
        if (token) {
            console.log("Already Logged IN")
        }
        else {
            console.log("Please Login")

        }
    }, []);
    const handleLogin = () => {
        setIsLoading(true); // Set isLoading to true when API call starts
        const token = localStorage.getItem('token');


        axios.post(axiosUrls.StudentLogin, {
            email: email,
            password: password
        })
            .then(result => {

                if (token) {
                    console.log("Already Logged INh", token)
                }
                else {
                    localStorage.setItem("token", JSON.stringify(result.data.token));
                    localStorage.setItem("studentID", JSON.stringify(result.data.student._id));
                    window.location.href = '/UserProfile';

                }
            })
            .catch(error => {
                console.log("Error:", error);
            })
            .finally(() => {
                setIsLoading(false); // Set isLoading to false when API call completes
            });

    };

    return (
        <div className="container vh-100 ">
            <div className="row justify-content-center align-items-center h-100">
                <div className='col-md-12' >
                    <h1 style={{ fontWeight: "800", fontSize: "60px" }}>
                        Welcome Back!
                    </h1>
                    <h6 className='lead' style={{ fontWeight: "800", fontSize: "40px" }}>
                        Log in to access your account.                    </h6>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus elit at nisi ultricies, sed tristique quam faucibus. Nullam non tortor euismod, accumsan purus sit amet, gravida orci. Ut nec velit justo. Integer varius, ligula ut consequat dictum, dolor dolor tincidunt turpis, et ultricies metus quam non enim. Morbi a lacus nec odio convallis aliquet. Phasellus eget malesuada metus. Sed faucibus vestibulum vestibulum. Mauris id ex nec sem feugiat tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin tincidunt malesuada tincidunt. Nullam vulputate, velit quis placerat luctus, risus ex tempus est, vel tincidunt nisi lorem a felis. Fusce viverra justo nec nisi vestibulum, ut eleifend metus ultricies. Sed vel erat id turpis pellentesque varius.                    </p>
                   
                </div>

            </div>
            <div className="row justify-content-center align-items-center h-100">

                <div className="col-md-4">
                    <div className="card" >
                        <div className="card-body">
                            <h2 className="card-title text-center">Login</h2>
                            <form>

                                <div className="mb-3 mt-5">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
                                </div>
                                <div className="d-grid gap-2 mt-5">
                                    <button type="button" className="btn btn-primary" onClick={handleLogin} disabled={isLoading}>
                                        {isLoading ? 'Please wait...' : 'Login'}
                                    </button>                                  </div>
                                <div className="mb-4 d-flex text-center mt-4">
                                    <hr className="w-100 mx-2" />
                                    <span className="mx-2">or</span>
                                    <hr className="w-100 mx-2" />
                                </div>
                                <div className="d-grid gap-2 mt-4">
                                    {/* <button type="button" className="btn btn-primary" onClick={handleLogin} disabled={isLoading}>
                                        {isLoading ? 'Please wait...' : 'Login'}
                                    </button>                             */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-between flex-wrap gap-3 mt-4'>
                        <img className='rounded img-fluid' src='https://img.freepik.com/free-photo/youngsters-posing-library_23-2147663785.jpg?t=st=1715753767~exp=1715757367~hmac=6baf1bdd7a1d7785d6360fa5382a9d0e10f612e5320cda63417e0505e066cd81&w=1380' style={{ height: "200px" }} />
                        <img className='rounded img-fluid' src='https://img.freepik.com/free-photo/collage-city-committed-education_23-2149886991.jpg?t=st=1715754100~exp=1715757700~hmac=1e3ecf96d90fd50f8b04a42339f9aaa7ada29c72512af68e4d1c23dba91cf1f9&w=826' style={{ width: "200px", height: "200px" }} />
                        <img className='rounded img-fluid' src='https://img.freepik.com/free-photo/group-diverse-grads-throwing-caps-up-sky_53876-56031.jpg?t=st=1715753974~exp=1715757574~hmac=c64417d6040dfff418dd109c80785240c8a8e0db1119e19cb9dce315b5937e8c&w=1380' style={{ height: "200px" }} />
                    </div>
        </div>
    );
}
