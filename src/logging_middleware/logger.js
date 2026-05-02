import axios from "axios";

const API = "http://localhost:5000";
let token = "";

export function setToken(t) {
  token = t;
}

export async function Log(stack, level, pkg, message) {
  try {
    await axios.post(
      `${API}/logs`,
      {
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: pkg.toLowerCase(),
        message,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    console.error("logging failed:", err.message);
  }
}