import axios from "axios";

const baseURL = `${process.env.REACT_APP_API}`;

if (process.env.NODE_ENV === "development") {
  console.log("api: ", baseURL);
}

export default axios.create({ baseURL });
