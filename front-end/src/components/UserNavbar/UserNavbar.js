import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function UserNavbar() {
    const isStudentLogin = localStorage.getItem("token");
    const handleLogout = () => {
        // Remove loginToken from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("studentID");
        window.location.href = `/student/login`;
    
      };
      const handleLogin = () => {
        // Remove loginToken from localStorage
        window.location.href = `/student/login`;
    
      };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">Your Logo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                        <div className="d-flex px-5">
                            {isStudentLogin ? (
                                <div className="d-flex justify-content-center align-items-center mt-lg-0 ms-2">
                                    <i className="fas fa-user-circle text-white h3 mt-2"></i>

                                    <div className="nav-item dropdown border-0 ms-1">

                                        <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Yasir
                                        </a>

                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ listStyleType: "none" }}>
                                            <li style={{ opacity: "0.8" }}>
                                                <Link to="/userProfile" className="dropdown-item font-2" style={{ paddingLeft: "8px" }} href="#">
                                                    <i className="fas fa-user"></i> My Courses
                                                </Link>
                                            </li>
                                            <li style={{ opacity: "0.8" }}>
                                                <Link to="/myProfile" className="dropdown-item font-2" style={{ paddingLeft: "8px" }} href="#">
                                                    <i className="fas fa-user"></i> My Profile
                                                </Link>
                                            </li>
                                            
                                            <li style={{ opacity: "0.8" }} onClick={handleLogout}>
                                                <Link to="/" className="dropdown-item font-2" style={{ paddingLeft: "8px" }} href="#">
                                                    <i className="fas fa-sign-out-alt"></i> Logout
                                                </Link>
                                            </li>
                                        </ul>

                                    </div>
                                </div>) : (
                                <button className="btn btn-outline-light me-2" onClick={handleLogin}>Login</button>
                            )}
                        </div>
                    </ul>
                </div>

            </div>
        </nav>
    );
}
