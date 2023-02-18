import React, { useEffect, useState } from "react";
import { isLoggedin } from "../customHooks/useAuth";

function ResetPassword() {
  const [userDetails, setUserDetails] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    isLoggedin();
  });

  const submitHandler = async () => {};
  return (
    <form className="container text-white mt-4" onSubmit={submitHandler}>
      <h1>Reset Password </h1>
      <div className=" mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.target.value })
          }
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          value={userDetails.confirmPassword}
          onChange={(e) =>
            setUserDetails({ ...userDetails, confirmPassword: e.target.value })
          }
          type="text"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default ResetPassword;
