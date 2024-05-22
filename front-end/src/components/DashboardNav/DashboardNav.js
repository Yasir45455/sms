import React from 'react';
import settingimg from '../../assets/settingimg.svg'
import bell from '../../assets/bell.svg'
import logout from '../../assets/logout.svg'
import search from '../../assets/search.svg'

export default function Navbar() {

  const handleLogout = () => {
    // Remove loginToken from localStorage
    localStorage.removeItem("loginToken");
    window.location.href = `/login`;

  };

  return (
    <>

      <nav className="navbar navbar-expand-lg pt-3 text-end">
        <div className="container-fluid px-5 text-end d-flex justify-content-between ">
          <div></div>

          <div className="d-flex align-items-center ">
            <ul className="navbar-nav flex-row d-flex align-items-center ">
              <li className='nav-item me-3' onClick={handleLogout}>
                <img src={logout} style={{ width: "20px" }} />
              </li>
              {/* <li className="nav-item me-3">
                <a className="nav-link" href="#">
                  <i className="fas fa-bell text-white"></i>
                </a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-user-circle text-white h3 m-0"></i>
                </a>
              </li>
              <li className="nav-item">
                <div className='d-flex flex-wrap justify-content-center align-items-center'>
                  {/* <div className='px-2'>
                    <img src={logout} style={{ width: "20px" }} />
                  </div> */}
                  {/* <div className='px-2'>
                    <img src={bell} style={{ width: "20px" }} />
                  </div>
                  <div>
                    <img src={settingimg} style={{ width: "50px" }} />
                  </div> */}
                  <div className='ms-2 text-center'>
                    <p className='p-0 m-0' style={{ fontSize: "12px" }}>Welcome</p>
                    <h6 className='fw-bold p-0 m-0 text-white' style={{ fontSize: "15px" }}>Admin</h6>
                  </div>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
};

