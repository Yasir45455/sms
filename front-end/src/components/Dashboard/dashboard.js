import React, { useEffect, useState } from 'react';
import DashboardSideBar from '../DashboardSideBar/DashboardSideBar.js';
import Navbar from '../DashboardNav/DashboardNav';
import StudentsEnrollment from '../StudentsEnrollment/StudentsEnrollment.js';
import Students from '../Students/Students.js';
import Courses from '../Courses/Courses.js';
import AddCourses from '../AddCourses/AddCourses.js';
import DashboardHome from '../DashboardHome/DashboardHome.js';
// import ComingSoon from '../ComingSoon/ComingSoon.js';
import SettingsAdmin from '../SettingsAdmin/SettingsAdmin.js';
import UpdateStudents from '../UpdateStudents/UpdateStudents.js';
import AssignCourses from '../AssignCourses/AssignCourses.js';

// import './dashboard.css';
export default function Dashboard() {
    const [selectedComponent, setSelectedComponent] = useState('dashboard'); // Set default selected component to 'dashboard'
    const [studentId, setstudentId] = useState(); // Set default selected component to 'dashboard'
    const handleMenuItemClick = (item,id ) => {
        setSelectedComponent(item); // Remove curly braces around id
        setstudentId(id)
    };
    return (
        <div className="container-fluid m-0 vw-100 vh-100">
            <div className="row h-100">
                <div className="col-lg-2 p-0">
                    <DashboardSideBar onItemClick={handleMenuItemClick} />
                </div>
                <div className="col-lg-10 p-0" style={{ color: "#fff", backgroundImage: 'linear-gradient(90deg, #2F3E58, #020404)' }}>
                    <Navbar />
                    <div className="p-3 m-0 " style={{ color: "#fff", backgroundImage: 'linear-gradient(90deg, #2F3E58, #020404)' }}>
                        <div className=''>
                            {selectedComponent === 'dashboard' && <DashboardHome />}
                            {selectedComponent === 'students' && <Students onItemClick={handleMenuItemClick} />}
                            {/* {selectedComponent === 'comingsoon' && <ComingSoon />} */}
                            {selectedComponent === 'Courses' && <Courses onItemClick={handleMenuItemClick} />}
                            {selectedComponent === 'AddCourses' && <AddCourses />}
                            {selectedComponent === 'UpdateStudents' && <UpdateStudents id={studentId} />}
                            {selectedComponent === 'studentsenrollment' && <StudentsEnrollment />}
                            {selectedComponent === 'SettingsAdmin' && <SettingsAdmin />}
                            {selectedComponent === 'AssignCourses' && <AssignCourses />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
