import React from "react";
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import StudentLogin from "./components/StudentLogin/StudentLogin.js";
import LoginAdmin from "./components/LoginAdmin/LoginAdmin.js";
import Dashboard from "./components/Dashboard/dashboard.js";
import UserNavbar from './components/UserNavbar/UserNavbar';
import UserProfile from "./components/UserProfile/UserProfile.js";
import MyProfile from "./components/MyProfile/MyProfile.js";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

const AppRouter = () => {
    // Check if loginToken exists in localStorage
    const isLoggedIn = localStorage.getItem("loginToken");
    const isStudentLoggedIn = localStorage.getItem("token");
    const location = useLocation();

    // Check if the current route is an admin route
    const isAdminRoute = location.pathname.startsWith("/dashboard");
    return (
        <>       {!isAdminRoute && <UserNavbar />}

            <Routes>
                <Route path="/about" element={<About />} />
               
                {isStudentLoggedIn && <Route path="/UserProfile" element={<UserProfile />} />}
                {isStudentLoggedIn && <Route path="/student/login" element={<Navigate to="/UserProfile" />} />}
                {isStudentLoggedIn && <Route path="/myProfile" element={<MyProfile />} />}
                {isStudentLoggedIn && <Route path="/student/login" element={<Navigate to="/myProfile" />} />}
                <Route path="/student/login" element={<StudentLogin />} />
                <Route path="/" element={<Home />} />

                {!isStudentLoggedIn && <Route path="*" element={<Navigate to="/student/login" />} />}


                {/* Dashboard Routes */}
                {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
                {/* Add other authenticated routes here */}

                {/* Redirect to dashboard if already authenticated and trying to access login page */}
                {isLoggedIn && <Route path="/login" element={<Navigate to="/dashboard" />} />}

                {/* Login route */}
                <Route path="/login" element={<LoginAdmin />} />

                {/* Redirect to login if not authenticated */}
                {!isLoggedIn && <Route path="/dashboard" element={<Navigate to="/login" />} />}

            </Routes>
        </>

    );
};

export default AppRouter;
