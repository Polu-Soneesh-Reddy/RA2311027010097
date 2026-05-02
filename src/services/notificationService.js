import axios from "axios";
import { Log } from "../logging_middleware/logger";

const API = "http://localhost:5000";
let token = "";

export function setServiceToken(t) {
  token = t;
}

export async function fetchNotifications(params = {}) {
  try {
    await Log("frontend", "info", "api", "Fetching notifications");

    const res = await axios.get(`${API}/notifications`, {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });

    await Log("frontend", "info", "api", "Notifications fetched");
    return res.data.notifications;
  } catch (err) {
    await Log("frontend", "error", "api", "Failed to fetch notifications");
    return [];
  }
}