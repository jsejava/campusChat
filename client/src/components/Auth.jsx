import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "./Auth.css";
import shop from "../assets/logo/shop.png";
import service from "../assets/logo/service.png";
import pay from "../assets/logo/pay-5.png";
import campusUp from "../assets/logo/s2.jpeg";
import campusIn from "../assets/logo/s1.png";
import Select from "react-select";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
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
  const [error, setError] = useState(false);

  const gender = [
    {
      label: (
        <div className="">
          <a className="">
            <img
              src="https://img.freepik.com/premium-vector/portrait-young-man-with-beard-hair-style-male-avatar-vector-illustration_266660-423.jpg?w=2000"
              alt="Young man with beard hair"
              width="30"
            />
          </a>{" "}
          <span>Young man with beard hair</span>
        </div>
      ),
      value:
        "https://img.freepik.com/premium-vector/portrait-young-man-with-beard-hair-style-male-avatar-vector-illustration_266660-423.jpg?w=2000",
    },
    {
      label: (
        <div className="">
          <a className="">
            <img
              src="https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-84.jpg?w=2000"
              alt="Young girl cute face"
              width="30"
            />
          </a>{" "}
          <span>Young girl cute face</span>
        </div>
      ),
      value:
        "https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-84.jpg?w=2000",
    },
    {
      label: (
        <div className="">
          <a className="">
            <img
              src="https://static.vecteezy.com/system/resources/previews/007/043/161/non_2x/male-avatar-smiling-portrait-of-a-cheerful-young-man-with-a-happy-smile-vector.jpg"
              alt="Young man with beard hair"
              width="25"
            />
          </a>{" "}
          <span>Young man with a happy smile</span>
        </div>
      ),
      value:
        "https://static.vecteezy.com/system/resources/previews/007/043/161/non_2x/male-avatar-smiling-portrait-of-a-cheerful-young-man-with-a-happy-smile-vector.jpg",
    },
    {
      label: (
        <div className="">
          <a className="">
            <img
              src="https://www.shutterstock.com/image-illustration/cute-girl-illustration-beautiful-face-260nw-1281482992.jpg"
              alt="Young girl cute face"
              width="30"
            />
          </a>{" "}
          <span>Cute girl with beautiful face</span>
        </div>
      ),
      value:
        "https://www.shutterstock.com/image-illustration/cute-girl-illustration-beautiful-face-260nw-1281482992.jpg",
    },
    {
      label: (
        <div className="">
          <a className="">
            <img
              src="https://img.freepik.com/premium-vector/avatar-man-with-glasses-portrait-young-guy-vector-illustration-face_217290-1809.jpg?w=2000"
              alt="Young man with beard hair"
              width="35"
            />
          </a>{" "}
          <span>Young man with glasses</span>
        </div>
      ),
      value:
        "https://img.freepik.com/premium-vector/avatar-man-with-glasses-portrait-young-guy-vector-illustration-face_217290-1809.jpg?w=2000",
    },
    {
      label: (
        <div className="">
          <a className="">
            <img
              src="https://media.istockphoto.com/id/1227320122/vector/cute-vector-girl-avatar-icon-pretty-lady-portrait.jpg?s=170x170&k=20&c=ybBo21zyd0FJ6dQKg391r39yZef3wY1Y3lZjV-3cjh8="
              alt="Young girl cute face"
              width="30"
            />
          </a>{" "}
          <span>Pretty lady with glasses</span>
        </div>
      ),
      value:
        "https://media.istockphoto.com/id/1227320122/vector/cute-vector-girl-avatar-icon-pretty-lady-portrait.jpg?s=170x170&k=20&c=ybBo21zyd0FJ6dQKg391r39yZef3wY1Y3lZjV-3cjh8=",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value, avatarURL: avatar });
  };

  const signinFunc = () => {
    if (
      form.username.trim().length === 0 ||
      form.password.trim().length === 0
    ) {
      return setError(true);
    } else ipcall();
  };
  const signupFunc = () => {
    if (
      form.fullName.trim().length === 0 ||
      form.username.trim().length === 0 ||
      form.password.trim().length === 0 ||
      form.phoneNumber.trim().length === 0 ||
      form.avatarURL.length === 0 ||
      form.password !== form.confirmPassword
    ) {
      return setError(true);
    } else ipcall();
  };

  const ipcall = async () => {
    const URL = "http://localhost:5002/auth";
    const { username, password, phoneNumber, avatarURL } = form;
    try {
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
    } catch (error) {
      console.log(error);
      let timerInterval;
      return Swal.fire({
        title: error?.response?.data.message,
        width: 500,
        color: "#716add",
        backdrop: `rgba(0,0,123,0.4)`,
        html: "<b>Please try again</b>",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            // b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          // console.log("I was closed by the timer");
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    isSignup ? signupFunc() : signinFunc();

    // if (form.password !== form.confirmPassword) return setPasserror(true);

    // const URL = 'https://medical-pager.herokuapp.com/auth';
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
              <>
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
                {error && form.fullName.trim().length <= 0 ? (
                  <label style={{ color: "red" }}>
                    fullName can't be Empty
                  </label>
                ) : null}
              </>
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
            {error && form.username.trim().length <= 0 ? (
              <label style={{ color: "red" }}>username can't be Empty</label>
            ) : null}
            {isSignup && (
              <>
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
                {error && form.phoneNumber.trim().length <= 0 ? (
                  <label style={{ color: "red" }}>
                    phoneNumber can't be Empty
                  </label>
                ) : null}
              </>
            )}
            {isSignup && (
              <>
                <div className="select-gender">
                  <label htmlFor="avatarURL">
                    Avatar <i style={{ color: "red" }}>(optional)</i>
                  </label>
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
                {/* {error && form.avatarURL.trim().length <= 0 ? (
                  <label style={{ color: "red" }}>Pls select an Avatar</label>
                ) : null} */}
              </>

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
            {error && form.password.trim().length <= 0 ? (
              <label style={{ color: "red" }}>Password can't be Empty</label>
            ) : null}
            {isSignup && (
              <>
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
                {/* {error && form.confirmPassword.trim().length <= 0 ? (
                  <label style={{ color: "red" }}>
                    confirmPassword can't be Empty
                  </label>
                ) : null} */}
                {error && form.password !== form.confirmPassword ? (
                  <label style={{ color: "red" }}>
                    Password does not match
                  </label>
                ) : null}
              </>
            )}
            {/* <div className="auth__form-container_fields-content_button"> */}
            <div>
              <button className="btn btn-outline-warning text-success">
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
