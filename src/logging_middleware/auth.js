import axios from "axios";
import { setToken } from "./logger";
import { setServiceToken } from "../services/notificationService";

const API = "http://localhost:5000";

export async function authenticate(data) {
  const res = await axios.post(`${API}/auth`, data);
  const { access_token } = res.data;

  setToken(access_token);
  setServiceToken(access_token);
}