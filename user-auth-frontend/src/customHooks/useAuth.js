import axios from "axios";

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
    return response;
  } catch (err) {
    console.log(err);
  }
};

export { isLoggedin };
