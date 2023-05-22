import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8000/",
    'Access-Control-Allow-Credentials': true,
    crossorigin: true,
})