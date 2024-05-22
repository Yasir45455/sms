import React from 'react';
import settingimg from '../../assets/settingimg.svg'

export default function SettingsAdmin() {
    return (
        <>
            <div className="container mt-5">
                <div className='d-flex flex-wrap'>
                    <h3 className='p-0 m-0'>General Settings</h3>
                </div>
                <div className="mt-3 row px-3">
                    <div className="col-md-8 bg-white rounded-2 p-3">
                        <div className='d-flex flex-wrap justify-content-between align-items-center'>
                            <div className='d-flex flex-wrap justify-content-center align-items-center'>
                                <div className='rounded-circle'>
                                    <img src={settingimg} />
                                </div>
                                <h5 className='fw-bold text-dark ms-3 '>Admin</h5>
                            </div>
                            <a className='text-dark text-decoration-none fw-bold'> Upload new picture </a>
                        </div>
                        <form className="container mt-5">
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="basicInfo" className="form-label text-dark">Basic Information:</label>
                                    <textarea id="basicInfo" name="basicInfo" className="form-control" placeholder="basic information"></textarea>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="moreInfo" className="form-label text-dark">More Information:</label>
                                    <textarea id="moreInfo" name="moreInfo" className="form-control" placeholder="more information"></textarea>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="fullName" className="form-label text-dark">Full Name:</label>
                                    <input type="text" id="fullName" name="fullName" className="form-control" placeholder="full name" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="oldPassword" className="form-label text-dark">Old Password:</label>
                                    <input type="password" id="oldPassword" name="oldPassword" className="form-control" placeholder="old password" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label text-dark">Email Address:</label>
                                    <input type="email" id="email" name="email" className="form-control" placeholder="email address" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="newPassword" className="form-label text-dark">New Password:</label>
                                    <input type="password" id="newPassword" name="newPassword" className="form-control" placeholder="new password" />
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-12 text-center">
                                    <button type="submit" className="btn border-0 text-white"

                                        style={{
                                            background: 'transparent linear-gradient(90deg, #2F3E58 0%, #020404 100%) 0% 0% no-repeat padding-box',
                                            borderRadius: '10px'
                                        }}

                                    >Save Changes</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </>
    );
}
