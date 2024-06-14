import React, { useContext, useEffect, useRef, useState } from "react";
import AuthStyle from "./classes.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SignContext } from "../State/State";
import { stateType } from "../../Utility/reducer";
import axios from "../../Utility/axios";

const baseUrl = `http://localhost:1234/api`;

function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const emailDOM = useRef(null);
  const firstNameDOM = useRef(null);
  const lastNameDOM = useRef(null);
  const userNameDOM = useRef(null);
  const passwordDOM = useRef(null);

  const [{ signstate }, dispatch] = useContext(SignContext);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Remove the animation class after the animation duration
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // 1000ms = 1s, match this duration with your animation duration

    return () => clearTimeout(timer);
  }, []);

  const handleSignState = () => {
    dispatch({
      type: stateType.SIGN_IN,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  async function handleSumbit(event) {
    event.preventDefault();

    const info = {
      usernameValue: userNameDOM.current.value,
      firstnameValue: firstNameDOM.current.value,
      lastnameValue: lastNameDOM.current.value,
      emailValue: emailDOM.current.value,
      passwordValue: passwordDOM.current.value,
    };

    const {
      usernameValue,
      firstnameValue,
      lastnameValue,
      emailValue,
      passwordValue,
    } = info;
    // console.log(info)
    // console.log(usernameValue)

    if (!emailValue) {
      emailDOM.current.style.border = "0.5px solid red";
      return;
    } else if (!firstnameValue) {
      firstNameDOM.current.style.border = "0.5px solid red";
      return;
    } else if (!lastnameValue) {
      lastNameDOM.current.style.border = "0.5px solid red";
      return;
    } else if (!usernameValue) {
      userNameDOM.current.style.border = "0.5px solid red";
      return;
    } else if (!passwordValue) {
      passwordDOM.current.style.border = "0.5px solid red";
      return;
    }

    try {
      await axios.post(`/users/register`, {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });
      // alert("succesfully registered");
      // navigate('/login')
      handleSignState();
    } catch (error) {
      if (error.response.data.msg == "password is too short") {
        setError(error.response.data.msg);
        return;
      } else if (error.response.data.msg === "user already registered") {
        setError(error.response.data.msg);
        return;
      }
      console.log(error.response.data.msg);
      alert("something went wrong");
    }
  }

  return (
    <div className={AuthStyle.form_container}>
      <div className={`${isAnimating ? AuthStyle.slidein : ""}`}>
        <div className={AuthStyle.signUp_title}>
          <p>Join the network</p>
          <p>
            Already have an account ?{" "}
            <span onClick={handleSignState}>Sign In</span>
          </p>
        </div>

        {error && <div className={AuthStyle.error_message}> {error} </div>}

        <form
          action=""
          className={AuthStyle.signUp_form}
          onSubmit={handleSumbit}
        >
              <div>
                <input
                  type="email"
                  ref={emailDOM}
                  name="email"
                  placeholder="Email address"
                />
              </div>

              <div className={AuthStyle.name}>
                <input
                  type="text"
                  name="firstname"
                  id="FirstName"
                  ref={firstNameDOM}
                  placeholder=" First Name"
                />
                <input
                  type="text"
                  name="lastname"
                  ref={lastNameDOM}
                  placeholder="Last Name"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="username"
                  ref={userNameDOM}
                  placeholder="User Name"
                />
              </div>

              <div className={AuthStyle.password_toggle_container}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  ref={passwordDOM}
                  placeholder="Password"
                  name="password"
                />
                <span
                  className={`fa ${passwordVisible ? "fa-eye" : "fa-eye-slash"}  ${
                    AuthStyle.pwd_toggle
                  }`}
                  onClick={togglePasswordVisibility}
                  aria-hidden="true"
                ></span>
              </div>

              <div className={AuthStyle.signUp_btn}>
                <button type="submit">Agree and Join</button>
              </div>
        </form>

        <div className={AuthStyle.signUp_agree}>
          <p>
            I agree to the <span>Privacy Policy</span> and{" "}
            <span>terms of service</span>
          </p>
          <p onClick={handleSignState}>Already have an account ?</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
