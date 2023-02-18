import axios from "axios";
import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../context";
function Navbar() {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userContext);
  console.log(userData);

  const logout = async () => {
    try {
      let response = await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3000/logout",

        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      if (response.data.succes) {
        setUserData(null);
        navigate("/login");
        return;
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  return (
    <nav className=" navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          User Authentication
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userData ? (
              <>
                <h1> Welcome {userData?.data?.user?.name}</h1>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
          {userData ? (
            <>
              <button type="button" className="btn btn-danger" onClick={logout}>
                Logout
              </button>
              <NavLink to="/resetpassword">
                <button type="button" className="btn btn-primary">
                  Reset Password
                </button>
              </NavLink>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
