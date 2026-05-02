import React, { useMemo } from "react";
import { Box, Typography, Fade } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";

import NotificationList from "../components/NotificationList";
import { useAppContext } from "../App";
import { getTopN } from "../utils/priority";

export default function PriorityPage() {
  const { notifications, handleMarkRead } = useAppContext();

  // recomputes whenever a notification is marked read
  const topNotifs = useMemo(() => getTopN(notifications), [notifications]);

  return (
    <Fade in timeout={600}>
      <Box>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <WhatshotIcon sx={{ color: "#FF6B9D", fontSize: 22 }} />
          <Typography variant="h6" sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #FF6B9D, #FFB547)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Priority Inbox
          </Typography>
          <Box sx={{ ml: 1, px: 1, py: 0.2, borderRadius: "6px", background: "rgba(255,107,157,0.1)" }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#FF6B9D", fontSize: "0.68rem" }}>
              TOP {topNotifs.length}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Showing the most important unread notifications, sorted by type priority and recency.
          Placement notifications rank highest, followed by Results, then Events.
        </Typography>

        <NotificationList data={topNotifs} markRead={handleMarkRead} />

        {topNotifs.length === 0 && notifications.length > 0 && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              All caught up! No unread notifications.
            </Typography>
          </Box>
        )}
      </Box>
    </Fade>
  );
}
