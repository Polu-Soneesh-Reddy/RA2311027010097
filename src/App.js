import React, { useEffect, useState, useMemo, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  Container, Typography, Button, Box, Paper, Badge, IconButton,
  Tooltip, LinearProgress, Collapse, BottomNavigation, BottomNavigationAction,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import RefreshIcon from "@mui/icons-material/Refresh";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import InboxIcon from "@mui/icons-material/Inbox";

import { authenticate } from "./logging_middleware/auth";
import { fetchNotifications } from "./services/notificationService";
import { Log } from "./logging_middleware/logger";
import { getTheme } from "./theme";
import AllNotificationsPage from "./pages/AllNotifications";
import PriorityPage from "./pages/PriorityInbox";
import "./App.css";

// shared state across pages
const AppContext = createContext();
export function useAppContext() {
  return useContext(AppContext);
}

function AppShell() {
  const [notifications, setNotifications] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(false);

  const theme = useMemo(() => getTheme(dark ? "dark" : "light"), [dark]);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname === "/priority" ? 1 : 0;

  useEffect(() => {
    async function init() {
      await authenticate({
        const authData = {
        email: "YOUR_EMAIL",
        name: "YOUR_NAME",
        rollNo: "YOUR_ROLL_NUMBER",
        accessCode: "YOUR_ACCESS_CODE",
        clientID: "YOUR_CLIENT_ID",
        clientSecret: "YOUR_CLIENT_SECRET",
      });
      await Log("frontend", "info", "page", "App loaded");
      loadNotifications();
    }
    init();
  }, []);

  async function loadNotifications() {
    setLoading(true);
    await Log("frontend", "info", "api", "Fetching notifications");

    const data = await fetchNotifications({
      notification_type: filterType,
      limit: 10,
      page,
    });

    const withReadState = data.map(n => ({ ...n, read: false }));
    setNotifications(withReadState);

    await Log("frontend", "debug", "state", "Notifications updated");
    setLoading(false);
  }

  function handleMarkRead(id) {
    Log("frontend", "info", "component", "Notification clicked");
    setNotifications(prev =>
      prev.map(n => n.ID === id ? { ...n, read: true } : n)
    );
  }

  function handleMarkAllRead() {
    Log("frontend", "info", "component", "Mark all as read");
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  // shared glass panel style
  const glassPanel = {
    background: theme.palette.mode === "dark"
      ? "rgba(22, 25, 41, 0.8)"
      : "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(20px)",
    border: theme.palette.mode === "dark"
      ? "1px solid rgba(255,255,255,0.06)"
      : "1px solid rgba(0,0,0,0.06)",
  };

  const contextValue = {
    notifications, filterType, setFilterType, page, setPage,
    loading, loadNotifications, handleMarkRead, handleMarkAllRead,
    unreadCount, theme, glassPanel,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* bg blobs */}
      <Box sx={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <Box sx={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)",
          top: "-10%", right: "-5%", animation: "float 8s ease-in-out infinite",
        }} />
        <Box sx={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)",
          bottom: "10%", left: "-5%", animation: "float 10s ease-in-out infinite reverse",
        }} />
        <Box sx={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,157,0.06) 0%, transparent 70%)",
          top: "40%", right: "20%", animation: "float 12s ease-in-out infinite",
        }} />
      </Box>

      {/* loading bar */}
      <Collapse in={loading}>
        <LinearProgress sx={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, height: 3,
          "& .MuiLinearProgress-bar": {
            background: "linear-gradient(90deg, #6C63FF, #00D4AA, #FF6B9D)",
            backgroundSize: "200% 100%",
            animation: "gradientShift 2s ease infinite",
          },
        }} />
      </Collapse>

      <Container maxWidth="md" sx={{
        position: "relative", zIndex: 1, minHeight: "100vh",
        pt: 3, pb: isMobile ? 10 : 3,
      }}>
        {/* header */}
        <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, mb: 3, ...glassPanel }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box sx={{
                width: { xs: 38, sm: 44 }, height: { xs: 38, sm: 44 }, borderRadius: "12px",
                background: "linear-gradient(135deg, #6C63FF, #4F46E5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 14px rgba(108,99,255,0.35)",
              }}>
                <NotificationsActiveIcon sx={{ color: "#fff", fontSize: { xs: 20, sm: 24 } }} />
              </Box>
              <div>
                <Typography variant={isMobile ? "h6" : "h5"} sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #6C63FF, #FF6B9D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.2,
                }}>
                  Notifications
                </Typography>
                <Typography variant="caption" color="text.secondary" fontSize="0.72rem">
                  Campus Notification Center
                </Typography>
              </div>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <Tooltip title="Refresh">
                <IconButton onClick={loadNotifications} size="small"
                  sx={{ "&:hover": { transform: "rotate(180deg)" }, transition: "all 0.3s" }}>
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={`${unreadCount} unread`}>
                <IconButton size="small">
                  <Badge badgeContent={unreadCount} color="error" sx={{
                    "& .MuiBadge-badge": {
                      fontWeight: 700, fontSize: "0.65rem",
                      minWidth: 18, height: 18,
                      background: "linear-gradient(135deg, #FF5252, #FF6B9D)",
                    },
                  }}>
                    <InboxIcon fontSize="small" />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title={dark ? "Light mode" : "Dark mode"}>
                <IconButton onClick={() => setDark(!dark)} size="small"
                  sx={{ ml: 0.5, "&:hover": { transform: "rotate(30deg) scale(1.1)" }, transition: "all 0.4s" }}>
                  {dark
                    ? <LightModeIcon fontSize="small" sx={{ color: "#FFB547" }} />
                    : <DarkModeIcon fontSize="small" sx={{ color: "#6C63FF" }} />
                  }
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* stats */}
          <Box display="flex" gap={{ xs: 1, sm: 2 }} mt={2} sx={{
            "& > div": { flex: 1, py: 1, px: 1.5, borderRadius: "10px", textAlign: "center" },
          }}>
            {[
              { label: "Total", value: notifications.length, color: "primary.main", bg: "108,99,255" },
              { label: "Unread", value: unreadCount, color: "error.main", bg: "255,82,82" },
              { label: "Read", value: notifications.length - unreadCount, color: "success.main", bg: "0,212,170" },
            ].map(stat => (
              <Box key={stat.label} sx={{
                background: theme.palette.mode === "dark"
                  ? `rgba(${stat.bg}, 0.08)` : `rgba(${stat.bg}, 0.06)`,
              }}>
                <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 800, color: stat.color, lineHeight: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontSize="0.68rem">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* desktop nav tabs */}
          {!isMobile && (
            <Box display="flex" gap={1} mt={2}>
              <Button
                variant={currentTab === 0 ? "contained" : "outlined"}
                startIcon={<InboxIcon />}
                onClick={() => navigate("/")}
                size="small"
              >
                All Notifications
              </Button>
              <Button
                variant={currentTab === 1 ? "contained" : "outlined"}
                startIcon={<WhatshotIcon />}
                onClick={() => navigate("/priority")}
                size="small"
                color="secondary"
              >
                Priority Inbox
              </Button>
            </Box>
          )}
        </Paper>

        {/* page content */}
        <AppContext.Provider value={contextValue}>
          <Routes>
            <Route path="/" element={<AllNotificationsPage />} />
            <Route path="/priority" element={<PriorityPage />} />
          </Routes>
        </AppContext.Provider>
      </Container>

      {/* mobile bottom nav */}
      {isMobile && (
        <Paper elevation={8} sx={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
          ...glassPanel, borderRadius: 0,
        }}>
          <BottomNavigation
            value={currentTab}
            onChange={(_, val) => navigate(val === 0 ? "/" : "/priority")}
            sx={{ background: "transparent" }}
          >
            <BottomNavigationAction label="All" icon={<InboxIcon />} />
            <BottomNavigationAction label="Priority" icon={<WhatshotIcon />} />
          </BottomNavigation>
        </Paper>
      )}
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}