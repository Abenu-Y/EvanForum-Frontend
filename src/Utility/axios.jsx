import axios from "axios";


const instance = axios.create({
    // baseURL:'http://localhost:1234/api',
    baseURL:'https://evanforum-backend-2.onrender.com'

})


export default instance