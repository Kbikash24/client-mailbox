import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredFirstName = firstNameRef.current.value;
    const enteredLastName = lastNameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    
    // Validate the form
    if (!enteredFirstName || !enteredLastName || !enteredEmail || !enteredPassword) {
      setError("All fields are mandatory!!");
      return;
    }
    
    setIsLoading(true);
    

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfG99JYJryY8Gs1vV6sCdPTlo-scjLn08",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          firstName:enteredFirstName,
          lastName:enteredLastName,
         
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          navigate("/login");
        } else {
          res.json().then((data) => {
            let errorMessage = "Signup Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            setError(errorMessage);
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError("An error occurred during sign-up.");
      });
  };

  return (
    <div className="signup template d-flex justify-content-center align-items-center w-100 vh-100 bg-primary">
      <div className="form-container p-5 rounded bg-white">
        <form onSubmit={submitHandler}>
          <h3 className="text-center">Sign Up</h3>
          <div className="mb-2">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="form-control"
              ref={firstNameRef}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="form-control"
              ref={lastNameRef}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              ref={emailRef}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              ref={passwordRef}
              required
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary">
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          {error && <p className="text-danger mt-2">{error}</p>}
          <p className="text-right text-center mt-3">
            <p>Already Registered</p>
            <a href="/login">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
