import React, { useState, useEffect, useRef } from 'react';
import MyChart from './MyChart';
import dashboardSearchBg from '../../assets/dashboardSearchBg.png'
import audience from '../../assets/audience.svg'
import clndr from '../../assets/calendar.svg'
import clock from '../../assets/clock.svg'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar CSS
import "./dashboardHome.css"
import axios from "../../Api/Axios";
import * as axiosUrls from '../../Api/AxiosUrls';

function formatDate(date) {
  // Array of month names
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get the month name
  const monthName = months[date.getMonth()];

  // Get the day and add suffix (e.g., 1st, 2nd, 3rd)
  const day = date.getDate();
  let dayWithSuffix;
  switch (day) {
    case 1:
    case 21:
    case 31:
      dayWithSuffix = `${day}st`;
      break;
    case 2:
    case 22:
      dayWithSuffix = `${day}nd`;
      break;
    case 3:
    case 23:
      dayWithSuffix = `${day}rd`;
      break;
    default:
      dayWithSuffix = `${day}th`;
  }

  // Get the year
  const year = date.getFullYear();

  // Format the date
  const formattedDate = `${monthName} ${dayWithSuffix}, ${year}`;

  return formattedDate;
}

export default function DashboardHome() {
  const currentDate = new Date();

  // Format the current date
  const formattedDate = formatDate(currentDate);

  const [date, setDate] = useState(new Date());

  const [studentData, setStudentData] = useState([]);
  const [lastAddedStudent, setLastAddedStudent] = useState(null);
  const [lastAddedCourse, setLastAddedCourse] = useState(null);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(axiosUrls.StudentsList);
      const studentCount = Array.isArray(response.data.Student) ? response.data.Student.length : 1;
      const students = Array.isArray(response.data.Student) ? response.data.Student : [response.data.Student];
      setStudentData(students);
      if (students.length > 0) {
        console.log(students)
        setLastAddedStudent(students[students.length - 1]);
      }
    } catch (error) {
      console.log("Error ******");
      console.log("Error fetching Student data:", error);
    }
  };

  const fetchCourseData = async () => {
    try {
      const response = await axios.get(axiosUrls.CoursesList);
      const CourseCount = Array.isArray(response.data.Course) ? response.data.Course.length : 1;
      const Courses = Array.isArray(response.data.Course) ? response.data.Course : [response.data.Course];
      // setCourseData(Courses);
      if (Courses.length > 0) {
        console.log(Courses)
        setLastAddedCourse(Courses[Courses.length - 1]);
      }
    } catch (error) {
      console.log("Error ******");
      console.log("Error fetching Course data:", error);
    }
  };

  useEffect(() => {
    fetchStudentData();
    fetchCourseData();
  }, []);


  const onChange = (date) => {
    setDate(date);
  }
  const renderShortWeekday = (locale, date) => {
    const options = { weekday: 'short' };
    return new Intl.DateTimeFormat(locale, options).format(date)[0]; // Return the first character of the abbreviated day name
  };
  return (
    <div className='container'>
      <h1 className='mb-3'>{formattedDate}</h1>

      <div className='row h-100'>
        <h2>Dashboard</h2>
        <div className='col-12 col-md-9 col-lg-9 col-xl-9'>
          <div className='w-100 py-4 m-0 text-center text-white d-flex flex-column justify-content-center align-items-center' style={{ backgroundImage: `url(${dashboardSearchBg})`, backgroundPosition: 'center', boxShadow: "0px 0px 10px #FFFFFF29", borderRadius: "15px" }}>
            <div className='w-75'>
              <h4>Search In Dashboard</h4>
              <p className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor</p>
              <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon2" />
            </div>
          </div>
          <div className='w-100 row mt-5'>
            <div className='col-12 col-md-6 col-lg-6 col-xl-6'>
              <div className='w-100 p-3 rounded-3 d-flex justify-content-between' style={{
                boxShadow: "0px 0px 10px #FFFFFF29"
                , border: "1px solid rgba(255, 255, 255, 0.25)"

              }}>
                <div>
                  <h6>Enrolled Students</h6>
                  <h4>{studentData.length}</h4>
                </div>
                <div>
                  <img src={audience} />
                </div>
              </div>
            </div>
            <div className=' col-12 col-md-6 col-lg-6 col-xl-6'>
              <div className='w-100 p-3 rounded-3 d-flex justify-content-between' style={{
                boxShadow: "0px 0px 10px #FFFFFF29"
                , border: "1px solid rgba(255, 255, 255, 0.25)"
              }}>
                <div>
                  <h6>Courses Offered</h6>
                  <h4>500</h4>
                </div>
                <div>
                  <img src={audience} />
                </div>
              </div>

            </div>
          </div>

          <div className='w-100 row py-3'>
            <div className='col-12 col-md-6 col-lg-6 col-xl-6'>
              <div className='w-100 p-3 rounded-3 d-flex justify-content-between' style={{
                boxShadow: "0px 0px 10px #FFFFFF29"
                , border: "1px solid rgba(255, 255, 255, 0.25)"

              }}>
                <div>
                  <h6>Fee Collected (This Month)</h6>
                  <h4>500</h4>
                </div>
                <div>
                  <img src={audience} />
                </div>
              </div>
            </div>
            <div className=' col-12 col-md-6 col-lg-6 col-xl-6'>
              <div className='w-100 p-3 rounded-3 d-flex justify-content-between' style={{
                boxShadow: "0px 0px 10px #FFFFFF29"
                , border: "1px solid rgba(255, 255, 255, 0.25)"

              }}>
                <div>
                  <h6>Total Classes</h6>
                  <h4>500</h4>
                </div>
                <div>
                  <img src={audience} />
                </div>
              </div>

            </div>
          </div>
          <div className='w-100 p-3 rounded-3' style={{
            boxShadow: "0px 0px 10px #FFFFFF29"
            , border: "1px solid rgba(255, 255, 255, 0.25)"

          }}>
            <MyChart />
          </div>

        </div>

        {/* Right */}
        <div className=' col-12 col-md-3 col-lg-3 col-xl-3'>
          <div>
            <Calendar
              formatShortWeekday={renderShortWeekday} // Customize the rendering of the abbreviated day names

              onChange={onChange}
              value={date}
              style={{ backgroundColor: "red" }}
            />
          </div>

          <h4 className='py-3'>Recent Activity</h4>
          <div className='w-100 p-3 rounded-3' style={{
            boxShadow: "0px 0px 10px #FFFFFF29"
            , border: "1px solid rgba(255, 255, 255, 0.25)"

          }}>
            {lastAddedStudent && (
              <>
                <h5>Student Added</h5>
                <div className='d-flex py-2 gap-3'>
                  <div>
                    <img className='me-2' src={clndr} alt="Calendar Icon" />
                    {lastAddedStudent.createdAt.split('T')[0]}
                  </div>
                  <div>
                    |
                  </div>
                  <div>

                    <img className='me-2' src={clock} alt="Clock Icon" />
                    {lastAddedStudent.createdAt.split('T')[1].slice(0, 5)} {/* Splitting and displaying time */}
                  </div>
                </div>
                <h6 className='mt-2'>{lastAddedStudent.full_name}</h6> {/* Assuming student object has a 'name' property */}
              </>
            )}
          </div>
          <div className='w-100 p-3 rounded-3 mt-3' style={{
            boxShadow: "0px 0px 10px #FFFFFF29"
            , border: "1px solid rgba(255, 255, 255, 0.25)"

          }}>
            {lastAddedCourse && (
              <>
                <h5>Course Added</h5>
                <div className='d-flex py-2 gap-3'>
                  <div>
                    <img className='me-2' src={clndr} alt="Calendar Icon" />
                    {lastAddedCourse.createdAt.split('T')[0]}
                  </div>
                  <div>
                    |
                  </div>
                  <div>

                    <img className='me-2' src={clock} alt="Clock Icon" />
                    {lastAddedCourse.createdAt.split('T')[1].slice(0, 5)} {/* Splitting and displaying time */}
                  </div>
                </div>
                <h6 className='mt-2'>{lastAddedCourse.coursename}</h6> {/* Assuming student object has a 'name' property */}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
