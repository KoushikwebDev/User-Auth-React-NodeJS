import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const { setUserData } = useContext(userContext);
  const [userData, setUserData2] = useState(null);
  const isLoggedin = async () => {
    try {
      let response = await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3000/dashboard",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        // headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);

      setUserData2(response);
      setUserData(response);
    } catch (err) {
      console.log(err);
      if (err) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    isLoggedin();
    // eslint-disable-next-line
  }, []);
  return (
    <div className=" container card mt-4" style={{ width: "18rem" }}>
      <img
        src={userData?.data?.user?.photo?.secure_url}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{userData?.data?.user?.name}</h5>
        <p className="card-text">{userData?.data?.user?.email}</p>
      </div>
    </div>
  );
}

export default Dashboard;
