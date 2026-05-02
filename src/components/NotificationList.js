import React from "react";
import { Card, CardContent, Typography, Chip, Box, Tooltip, Fade } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// maps each notification type to its visual config
const types = {
  Placement: {
    color: "#00D4AA",
    gradient: "linear-gradient(135deg, #00D4AA, #00B894)",
    tint: "rgba(0, 212, 170, 0.08)",
    border: "rgba(0, 212, 170, 0.25)",
    icon: WorkIcon,
    chip: "success",
  },
  Result: {
    color: "#6C63FF",
    gradient: "linear-gradient(135deg, #6C63FF, #4F46E5)",
    tint: "rgba(108, 99, 255, 0.08)",
    border: "rgba(108, 99, 255, 0.25)",
    icon: EmojiEventsIcon,
    chip: "primary",
  },
  Event: {
    color: "#FFB547",
    gradient: "linear-gradient(135deg, #FFB547, #FF9800)",
    tint: "rgba(255, 181, 71, 0.08)",
    border: "rgba(255, 181, 71, 0.25)",
    icon: EventIcon,
    chip: "warning",
  },
};

function timeAgo(ts) {
  if (!ts) return "";
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function NotificationCard({ notification: n, markRead, index }) {
  const cfg = types[n.Type] || types.Event;
  const Icon = cfg.icon;

  return (
    <Fade in timeout={300 + index * 80}>
      <Card
        onClick={() => markRead(n.ID)}
        sx={{
          mb: 2,
          cursor: "pointer",
          position: "relative",
          overflow: "visible",
          background: (theme) =>
            n.read
              ? theme.palette.background.paper
              : `linear-gradient(135deg, ${cfg.tint}, ${theme.palette.background.paper})`,
          border: (theme) =>
            n.read
              ? `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}`
              : `1px solid ${cfg.border}`,
          opacity: n.read ? 0.65 : 1,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-3px) scale(1.005)",
            boxShadow: n.read
              ? "0 4px 20px rgba(0,0,0,0.08)"
              : `0 8px 30px ${cfg.color}22`,
          },
          // colored left strip
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: 4,
            borderRadius: "4px 0 0 4px",
            background: n.read ? "transparent" : cfg.gradient,
          },
        }}
      >
        <CardContent sx={{ p: "16px 20px !important" }}>
          <Box display="flex" alignItems="flex-start" gap={1.5}>
            {/* icon */}
            <Box
              sx={{
                width: 40, height: 40,
                borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: n.read ? "rgba(128,128,128,0.08)" : cfg.tint,
                flexShrink: 0,
              }}
            >
              <Icon sx={{ fontSize: 20, color: n.read ? "text.secondary" : cfg.color }} />
            </Box>

            <Box flex={1} minWidth={0}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Chip
                    label={n.Type}
                    color={cfg.chip}
                    size="small"
                    variant={n.read ? "outlined" : "filled"}
                    sx={{ height: 22, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}
                  />
                  {!n.read && (
                    <FiberManualRecordIcon sx={{ fontSize: 8, color: cfg.color }} />
                  )}
                </Box>

                <Box display="flex" alignItems="center" gap={0.5}>
                  <AccessTimeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                    {timeAgo(n.Timestamp)}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: n.read ? 400 : 600,
                  lineHeight: 1.4,
                  color: n.read ? "text.secondary" : "text.primary",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {n.Message}
              </Typography>
            </Box>

            {n.read && (
              <Tooltip title="Read">
                <CheckCircleIcon sx={{ fontSize: 18, color: "text.secondary", opacity: 0.5, mt: 0.5 }} />
              </Tooltip>
            )}
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}

export default function NotificationList({ data, markRead }) {
  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Box
          sx={{
            width: 64, height: 64, borderRadius: "16px",
            background: "rgba(108, 99, 255, 0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            mx: "auto", mb: 2,
          }}
        >
          <EventIcon sx={{ fontSize: 32, color: "primary.main", opacity: 0.6 }} />
        </Box>
        <Typography variant="h6" color="text.secondary" fontWeight={500}>
          No notifications yet
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          New notifications will show up here
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {data.map((n, i) => (
        <NotificationCard key={n.ID} notification={n} markRead={markRead} index={i} />
      ))}
    </Box>
  );
}