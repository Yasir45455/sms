import React, { useState } from 'react';
import "./DashBoardNavbar.css";
import logo from '../../assets/logo.png'
import dashboard from '../../assets/dashboard.svg'
import Courses from '../../assets/coursesIcon.svg'
import students from '../../assets/students.svg'
import FinanceIcon from '../../assets/finance.svg'
import settings from '../../assets/settings.svg'
import studentsenroll from '../../assets/studentsenroll.png'

export default function DashboardSideBar({ onItemClick }) {
    const [activeItem, setActiveItem] = useState('dashboard'); // Default active item is 'dashboard'

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
        onItemClick(itemName);
    };

    return (
        <div className="sidebar text-light" style={{backgroundColor:"#2D3747"}}>
            <div className="sidebar-header">
                <img src={logo} className='img-fluid' style={{
                    width: "270px",
                    height: "104px"
                }} />
            </div>
            <div className='d-flex justify-content-center align-items-center flex-column"'>
                <ul className="list-unstyled components">
                    <li className={`mb-3 dashboardbtns px-3 ${activeItem === 'dashboard' ? 'bgActiveNav' : ''}`} onClick={() => handleItemClick('dashboard')}>
                        <img src={dashboard} className='me-2 dashboardIcons' /> <a href="#" className="text-decoration-none">Dashboard</a>
                    </li>
                    <li className={`mb-3 dashboardbtns px-3 ${activeItem === 'students' ? 'bgActiveNav' : ''}`} onClick={() => handleItemClick('students')}>
                        <img src={students} className='me-2 dashboardIcons' /><a href="#" className="text-decoration-none">Students</a>
                    </li>
                    <li className={`mb-3 dashboardbtns px-3 ${activeItem === 'studentsenrollment' ? 'bgActiveNav' : ''}`} onClick={() => handleItemClick('studentsenrollment')}>
                        <img src={studentsenroll} className='me-2 dashboardIcons' /> <a href="#" className="text-decoration-none">Students Enrollment</a>
                    </li>
                    <li className={`mb-3 dashboardbtns px-3 ${activeItem === 'Courses' ? 'bgActiveNav' : ''}`} onClick={() => handleItemClick('Courses')}>
                        <img src={Courses} className='me-2 dashboardIcons' /> <a href="#" className="text-decoration-none">Courses</a>
                    </li>
                    <li className={`mb-3 dashboardbtns px-3 ${activeItem === 'AssignCourses' ? 'bgActiveNav' : ''}`} onClick={() => handleItemClick('AssignCourses')}>
                        <img src={Courses} className='me-2 dashboardIcons' /> <a href="#" className="text-decoration-none">Assign Courses</a>
                    </li>
                    {/* <li className={`mb-3 dashboardbtns px-3 ${activeItem === 'comingsoon' ? 'bgActiveNav' : ''}`} onClick={() => handleItemClick('comingsoon')}>
                        <img src={students} className='me-2 dashboardIcons' /> <a href="#" className="text-decoration-none">Scheduling</a>
                    </li>
                    <li className={`mb-3 dashboardbtns px-3 ${activeItem === 'comingsoon' ? 'bgActiveNav' : ''}`} onClick={() => handleItemClick('comingsoon')}>
                        <img src={FinanceIcon} className='me-2 dashboardIcons' /> <a href="#" className="text-decoration-none">Finance Management</a>
                    </li> */}
                    <li className={`mb-3 dashboardbtns px-3 ${activeItem === 'SettingsAdmin' ? 'bgActiveNav' : ''}`} onClick={() => handleItemClick('SettingsAdmin')}>
                        <img src={settings} className='me-2 dashboardIcons' /> <a href="#" className="text-decoration-none">Settings</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
