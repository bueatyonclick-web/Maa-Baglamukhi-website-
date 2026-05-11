import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const apiGet = (path) => api.get(path).then((r) => r.data);
export const apiPost = (path, body) => api.post(path, body).then((r) => r.data);
