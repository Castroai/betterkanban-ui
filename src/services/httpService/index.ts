import axios from "axios";

export const httpService = axios.create({
  baseURL: "http://100.25.22.143/",
});
