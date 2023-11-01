import React from "react";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setError("All fields are mandatory!!");
      return;
    }

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfG99JYJryY8Gs1vV6sCdPTlo-scjLn08",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        setLoading(false);
        const data = await res.json();
        dispatch(authAction.login(data.idToken));
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("numberOfMails", 0);
        console.log("User LoggedIn successfully");
        navigate("/");
      } else {
        setLoading(false);
        const data = await res.json();
        if (data && data.error.message) {
          setError("Login not successful- " + data.error.message);
        } else {
          setError("Some error occured!! Please try again..");
        }
      }
    } catch (error) {
      console.error("Error logging in :", error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="form-container p-5 rounded bg-white">
        <form onSubmit={handleLogin}>
          <h3 className="text-center">Sign In</h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms-2">
              Remember me
            </label>
          </div>
          <div className="d-grid">
          <button className="btn btn-primary">
              {loading ? "Logging In..." : "Sign In"}
            </button>
          </div>
          {error && <p className="text-danger mt-2">{error}</p>}
          <p className="text-right mt-3">
            <a href="/forgotpassword">Forgot Password?</a>
            <br></br>
            <a href="/signup" type="submit">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
