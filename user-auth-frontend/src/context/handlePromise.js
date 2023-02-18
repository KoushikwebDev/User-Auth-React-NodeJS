import axios from "axios";

let handlePromise = async (url, userData) => {
  let data, err;
  try {
    data = await axios({
      method: "POST",
      withCredentials: true,
      url: url,
      data: userData,
      // headers: { "Content-Type": "application/x-www-form-urlencoded" },
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    err = error.message;
  }
  return { data, err };
};

export default handlePromise;
