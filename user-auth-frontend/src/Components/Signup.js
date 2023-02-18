import React, { useContext, useState } from "react";
import { userContext } from "../context";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const { handleSubmit } = useContext(userContext);

  console.log(image);

  const formData = new FormData();

  formData.append("name", userDetails.name);
  formData.append("email", userDetails.email);
  formData.append("password", userDetails.password);
  formData.append("photo", image);

  const submitData = async (e) => {
    e.preventDefault();
    if (!(userDetails.name && userDetails.email && userDetails.password)) {
      return;
    }
    const data = await handleSubmit(formData);

    console.log(data);
    if (data.succes) {
      navigate("/");
    }
  };

  return (
    <form className="container text-white mt-4" onSubmit={submitData}>
      <h1>Sign up</h1>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Name
        </label>
        <input
          value={userDetails.name}
          onChange={(e) =>
            setUserDetails({ ...userDetails, name: e.target.value })
          }
          type="text"
          className="form-control"
          id="name"
        />
      </div>
      <div className=" mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
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
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.target.value })
          }
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Photo</label>
        <input
          name="photo"
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          className="form-control"
          id="file"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Signup;
