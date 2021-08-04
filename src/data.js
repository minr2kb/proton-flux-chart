import axios from "axios";

const response = await axios.get("http://127.0.0.1:5000");

console.log(response.data["20210803"].time);
