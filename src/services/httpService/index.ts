import axios from "axios";
import { Auth } from 'aws-amplify'

const httpService = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API}`,
});
httpService.interceptors.request.use(
  async config => {
    try {
      const data = await Auth.currentSession()
      const token = data.getAccessToken().getJwtToken()
      if (token) {
        config.headers.authorization = token
      }
    } catch (error) {
      // Handle error when there is no user session
      console.log("No user session found:", error)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);
export { httpService }
