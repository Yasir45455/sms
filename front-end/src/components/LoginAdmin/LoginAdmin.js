import React, { useState } from "react";
import axios from "../../Api/Axios";
import * as axiosUrls from '../../Api/AxiosUrls'
import { Link, useNavigate } from "react-router-dom";
import loginadminstyles from './loginadmin.module.css'; // Import the CSS module
import loginadminbg from '../../assets/loginadminbg.png'
import logo from '../../assets/logo.png'
import googleIcon from '../../assets/googleIcon.svg'
import fbIcon from '../../assets/fbIcon.svg'

export default function LoginAdmin() {

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };
  // Sign In API Integration
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePasswordLogin = (e) => {
    setPassword(e.target.value)
    console.log(password)
  }
  const handleEmailLogin = (e) => {
    setEmail(e.target.value)
    console.log(email)

  }
  const handleApiLogin = async () => {



    await axios.post(axiosUrls.loginApi, {
      email: email,
      password: password
    })
      .then(result => {
        console.log("Login success", JSON.stringify(result.data.token))
        localStorage.setItem("loginToken", JSON.stringify(result.data.token))
        window.location.href = '/dashboard';

      })
      .catch(error => {
        console.log("Error is here")

        console.log(error)
      })
  }



  return (
    <div className={loginadminstyles.main} style={{ backgroundImage: `url(${loginadminbg})`, height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='container-fluid h-100'>
        <div className='row h-100'>
          <div className=' col-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center flex-column'>
            <img src={logo} className='img-fluid' style={{
              width: "270px",
              height: "104px"
            }} />
            <h2 className='text-center text-white py-3'>One tool for all <br></br> your management needs!</h2>
          </div>
          <div className='col-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center flex-column'>
            <div className={` bg-white p-4 ${loginadminstyles.formdiv}`}>
              <div className='mb-4'>
                <h2>Sign in</h2>
                <span className='text-dark'>New user? <span>Create an account</span></span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-4">
                  <input type="email" className="form-control" value={email}
                    onChange={handleEmailLogin} placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-4">
                  <input type="password" className="form-control" value={password}
                    onChange={handlePasswordLogin} placeholder="Password" aria-label="Password" aria-describedby="basic-addon2" />
                </div>
                <div className="mb-4 d-flex justify-content-between align-items-center">
                  <a href="#" className="text-decoration-none text-dark">Forgot Password?</a>
                  <button type="submit" onClick={handleApiLogin} className={`py-2 border-0 text-white px-5 ${loginadminstyles.signInbtn}`}>

                    <Link
                      className="text-decoration-none"
                      style={{ color: "inherit", style: "none" }}
                    >

                    Sign in
                    </Link>

                  </button>

                </div>
              </form>
              <div className="mb-4 d-flex text-center">
                <hr className="w-100 mx-2" />
                <span className="mx-2">or</span>
                <hr className="w-100 mx-2" />
              </div>
              <div className="d-flex justify-content-between gap-2 mb-4">
                <button className={`py-2  text-dark px-5 ${loginadminstyles.googlebtn}`} type="button">


                  <img src={googleIcon} className='me-2' />
                  Google</button>
                <button className={`py-2  text-dark px-5  ${loginadminstyles.facebookbtn}`} type="button">
                  <img src={fbIcon} className='me-2' />

                  Facebook</button>
              </div>
              <p className="text-muted small  mb-0 mt-5">Protected by reCAPTCHA and subject to the Oxmite Digital Privacy Policy and Terms of Service.</p>

            </div>
          </div>

        </div>
      </div>
    </div>

  );
}
