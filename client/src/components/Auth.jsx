import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "./Auth.css";
import ConnectIcon from "../assets/logo/chat.png";
import signinImage from "../assets/signup.jpg";
import house from "../assets/house.png";
import shop from "../assets/logo/shop.png";
import service from "../assets/logo/service.png";
import pay from "../assets/logo/pay-5.png";
import campusUp from "../assets/logo/s2.jpeg";
import campusIn from "../assets/logo/s1.png";
import bg1 from "../assets/logo/bg.png";
import bg2 from "../assets/logo/bg2.png";
import bg3 from "../assets/logo/bg1.jpeg";
import Select from "react-select";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [avatar, setAvatarURL] = useState("");
  const [isSignup, setIsSignup] = useState(true);

  const gender = [
    {
      label: (
        <div className="">
          <a href="http://localhost:3000/shop">
            <img src={shop} alt="CampusConnection" width="30" />
          </a>{" "}
          <span>basket.....</span>
        </div>
      ),
      value:
        "https://img.freepik.com/premium-vector/portrait-young-man-with-beard-hair-style-male-avatar-vector-illustration_266660-423.jpg?w=2000",
    },
    {
      label: "Female",
      value:
        "https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-84.jpg?w=2000",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value, avatarURL: avatar });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, phoneNumber, avatarURL } = form;
    // console.log(form);
    //console.log(avatarURL);
    const URL = "http://localhost:5002/auth";
    // const URL = 'https://medical-pager.herokuapp.com/auth';

    const {
      data: { token, userId, hashedPassword, fullName, image },
    } = await axios.post(
      `${URL}/${isSignup ? "signup" : "login"}`,
      isSignup
        ? {
            username,
            password,
            fullName: form.fullName,
            phoneNumber,
            avatarURL,
          }
        : { username, password }
    );

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);
    cookies.set("avatarURL", image);

    if (isSignup) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <div className="row align-items-center">
            <div className="col-4 col-md-4 col-lg-4 col-xl-4 text-center">
              <a href="http://localhost:3000/shop">
                <img src={shop} alt="CampusConnection" width="30" />
              </a>
            </div>
            <div className="col-4 col-md-4 col-lg-4 col-xl-4 text-center">
              <a href="http://localhost:3000/service">
                <img src={service} alt="CampusConnection" width="30" />
              </a>
            </div>
            <div className="col-4 col-md-4 col-lg-4 col-xl-4 text-center">
              <a href="http://localhost:4000">
                <img src={pay} alt="CampusConnection" width="30" />
              </a>
            </div>
          </div>
          <a href="http://localhost:3000">
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
                // flexDirection: "row",
                // marginTop: "40px",
              }}
            >
              {isSignup ? (
                <img src={campusUp} alt="CampusConnection" width="100" />
              ) : (
                <img src={campusIn} alt="CampusConnection" width="100" />
              )}
            </div>
          </a>

          <p>{isSignup ? "Register" : "Login"}</p>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="select-gender">
                <label htmlFor="avatarURL">Avatar URL</label>
                <Select
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      width: "85%",
                      bordeRadius: "5px",
                      color: "#b1b1b1",
                      fontWeight: "unset",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }),
                  }}
                  value={gender.value}
                  onChange={(value) => setAvatarURL(value.value)}
                  //onChange={handleChange}
                  options={gender}
                  placeholder="Select Avatar"
                />
              </div>

              // <div className="auth__form-container_fields-content_input">
              //   <label htmlFor="avatarURL">Avatar URL</label>
              //   <input
              //     name="avatarURL"
              //     type="text"
              //     placeholder="Avatar URL"
              //     onChange={handleChange}
              //     required
              //   />
              // </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {/* <div className="auth__form-container_fields-content_button"> */}
            <div>
              <button className="btn btn-outline-warning  text-success">
                <b>{isSignup ? "Register" : "Login"}</b>
              </button>
            </div>
          </form>

          <div className="auth__form-container_fields-account">
            <p>
              {isSignup
                ? "Already have an account? "
                : "Don't have an account? "}
              <i
                className="btn btn-outline-warning text-success"
                onClick={switchMode}
              >
                {isSignup ? "Login" : "Register"}
              </i>
            </p>
          </div>

          {/* <div class="container"> */}
          {/* <div class="row row-cols-12">
            <div class="col">
              <img src={ConnectIcon} alt="CampusConnection" width="30" />
            </div>
          </div> */}
        </div>
      </div>
      {/* </div> */}
      <div className="auth__form-container_image">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlCcCyCEuuV-a9GylX1MaNp49Fq_2y2fl2ZE75q5V0ONtIRN5t3MZKV6Okqch5nw6m6qM&usqp=CAU"
          //src={bg2}
          alt="sign in"
        />
      </div>
    </div>
  );
};

export default Auth;
