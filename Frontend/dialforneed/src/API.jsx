import axios from 'axios'

axios.defaults.withCredentials = true;

export default axios.create(
    // {baseURL:'https://dialforneed-1.onrender.com/api'}
    {baseURL:'http://localhost:4000/api'}
)