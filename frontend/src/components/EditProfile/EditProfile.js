import { React, useState, useEffect } from "react";
import "./EditProfile.css";
import axios from "axios";
import user from "../../images/profile-picture.png";

const EditProfile = () => {
    return (
        <div>
            <section className="bg-secondary text-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <h2>Edit Your Profile</h2>
                            <br />
                            <p className="lead">Here you can edit your personal profile</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-dark p-5">
                <div className="container text-center">
                    <div className="col">
                        <p className="lead">Please update your information below</p>
                        <div className="card px-4 bg-light">
                            <div className="card-header bg-light">Choose a new profile picture!</div>
                            <div className="card-body text-center text-light bg-light py-3">
                                <img className="img-fluid text-center rounded-circle img-account-profile w-50" src={user} />
                                
                                <br /><br />
                                <button type="button" className="btn btn-outline-info">Update Profile Picture</button>
                            </div>
                        </div>
                        <br /><br />
                        <div className="card px-4 bg-light">
                            <div className="card-header bg-light">Edit your personal information!</div>
                            <div className="card-body text-center bg-light">
                                <form>
                                    <div className="row mb-2">
                                        <div className="col md-5">
                                            <label className="small mb-2">
                                                First Name
                                            </label>
                                            <input className="form-control" type="text" />
                                        </div>
                                        <div className="col md-5">
                                            <label className="small mb-2">
                                                Last Name
                                            </label>
                                            <input className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col md-5">
                                            <label className="small mb-2">
                                                Email Address
                                            </label>
                                            <input className="form-control" type="text" />
                                        </div>
                                        <div className="col md-5">
                                            <label className="small mb-2">
                                                Phone Number
                                            </label>
                                            <input className="form-control" type="text" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <br /><br />
                        <div className="row mx-5">
                            <div className="col">
                                <button type="button" className="btn btn-outline-secondary">Cancel Changes</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-outline-secondary">Save Changes</button>
                            </div>
                        </div>
                        <br /><br /><br />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditProfile;