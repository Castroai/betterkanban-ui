import axios from "axios";
import { Auth } from 'aws-amplify'

const httpService = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API}/board`,
});
httpService.interceptors.request.use(
  async config => {
    const data = await Auth.currentSession()
    const token = data.getAccessToken().getJwtToken()
    if (token) {
      config.headers.authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);
export { httpService }