import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=YOUR_API_KEY",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            alert("Password reset request sent");
          });
        } else {
          response.json().then((data) => {
            if (data && data.error.message) {
              setError("Password reset request not successful - " + data.error.message);
            } else {
              setError("Some error occurred. Please try again.");
            }
          });
        }
      })
      .catch((err) => {
        console.log("Reset Password request not sent - " + err.message);
      });
    setEmail("");
  };

  return (
    <div className="container mt-5" style={{width:'1000px',height:'700px'}}>
      <div className="row">
        <div style={{alignItems:'center'}}>
          <form style={{fontSize:'18px'}}>
            <h2>Forgot Password?</h2>
            <p className="text-muted text-lg" style={{marginTop:'30px',fontSize:'18px'}}>Enter your registered email.</p>
            <div className="mb-3">
              <input
              style={{fontSize:'18px'}}
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter Registered Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            {!loading && (
              <button
                type="submit"
                className="btn btn-primary"
                onClick={passwordChangeHandler}
              >
                Send link
              </button>
            )}
            <p className="mt-3 text-lg" >
              Already a user? <Link to="/login">Login</Link>
            </p>
            {loading && <p className="mt-3">Submitting Data...</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
