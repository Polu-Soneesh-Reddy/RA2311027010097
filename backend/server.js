const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API = "http://20.207.122.201/evaluation-service";

// proxy auth to the evaluation API
app.post("/auth", async (req, res) => {
  try {
    const resp = await axios.post(`${API}/auth`, req.body);
    res.json(resp.data);
  } catch (err) {
    console.log("auth error:", err.response?.data || err.message);
    res.status(500).json(err.response?.data || { error: "Auth failed" });
  }
});

app.get("/notifications", async (req, res) => {
  try {
    const resp = await axios.get(`${API}/notifications`, {
      params: req.query,
      headers: { Authorization: req.headers.authorization },
    });
    res.json(resp.data);
  } catch (err) {
    console.log("notif error:", err.response?.data || err.message);
    res.status(500).json(err.response?.data || { error: "Fetch failed" });
  }
});

app.post("/logs", async (req, res) => {
  try {
    const resp = await axios.post(`${API}/logs`, req.body, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(resp.data);
  } catch (err) {
    console.log("log error:", err.response?.data || err.message);
    res.status(500).json(err.response?.data || { error: "Log failed" });
  }
});

app.listen(5000, () => console.log("backend running on :5000"));