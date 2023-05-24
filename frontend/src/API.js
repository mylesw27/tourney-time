import axios from "axios";

export default axios.create({
    baseURL: "http://10.0.0.197:8000/",
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': true,
    crossorigin: true,
})