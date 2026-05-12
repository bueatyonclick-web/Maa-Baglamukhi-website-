import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const apiGet = (path) => api.get(path).then((r) => r.data);
export const apiPost = (path, body) => api.post(path, body).then((r) => r.data);

/** Short-lived GET cache to avoid duplicate calls when revisiting sections (e.g. home live stats). */
const getCache = new Map();

/**
 * @param {string} path
 * @param {number} [ttlMs]
 */
export function apiGetCached(path, ttlMs = 45000) {
  const hit = getCache.get(path);
  if (hit && Date.now() - hit.t < ttlMs) {
    return Promise.resolve(hit.data);
  }
  return apiGet(path).then((data) => {
    getCache.set(path, { data, t: Date.now() });
    return data;
  });
}
