import axios from 'axios';

export default axios.create({
  baseURL: process.env.apiUrl || 'http://localhost:4000',
});
