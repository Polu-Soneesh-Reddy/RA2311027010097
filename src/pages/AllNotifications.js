import React, { useState } from "react";
import {
  Box, Typography, Button, Paper, Select, MenuItem, FormControl,
  InputLabel, Collapse, Fade, Divider,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import TuneIcon from "@mui/icons-material/Tune";
import InboxIcon from "@mui/icons-material/Inbox";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import NotificationList from "../components/NotificationList";
import { useAppContext } from "../App";

export default function AllNotificationsPage() {
  const {
    notifications, filterType, setFilterType, page, setPage,
    loadNotifications, handleMarkRead, handleMarkAllRead,
    unreadCount, glassPanel,
  } = useAppContext();

  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      {/* toolbar */}
      <Fade in timeout={600}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={1}>
          <Box display="flex" gap={1}>
            <Button
              variant={filtersOpen ? "contained" : "outlined"}
              startIcon={<TuneIcon />}
              onClick={() => setFiltersOpen(!filtersOpen)}
              size="small"
            >
              Filters
            </Button>
            <Button
              variant="outlined" color="success"
              startIcon={<DoneAllIcon />}
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              size="small"
            >
              Mark All Read
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary" fontStyle="italic">
            Page {page}
          </Typography>
        </Box>
      </Fade>

      {/* filters */}
      <Collapse in={filtersOpen} timeout={400}>
        <Paper elevation={0} sx={{ p: 2.5, mb: 3, ...glassPanel }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <FilterListIcon sx={{ fontSize: 18, color: "primary.main" }} />
            <Typography variant="subtitle2" fontWeight={700}>
              Filter Notifications
            </Typography>
          </Box>
          <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
            <FormControl size="small" sx={{ minWidth: 200, flex: 1 }}>
              <InputLabel>Type</InputLabel>
              <Select value={filterType} onChange={e => setFilterType(e.target.value)} label="Type">
                <MenuItem value=""><em>All Types</em></MenuItem>
                <MenuItem value="Event">🎉 Event</MenuItem>
                <MenuItem value="Result">🏆 Result</MenuItem>
                <MenuItem value="Placement">💼 Placement</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={loadNotifications} startIcon={<FilterListIcon />}
              sx={{ background: "linear-gradient(135deg, #6C63FF, #4F46E5)", px: 3 }}>
              Apply
            </Button>
          </Box>
        </Paper>
      </Collapse>

      {/* notification list */}
      <Fade in timeout={800}>
        <Box mb={4}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <InboxIcon sx={{ color: "primary.main", fontSize: 22 }} />
            <Typography variant="h6" fontWeight={700}>All Notifications</Typography>
            <Box sx={{ ml: 1, px: 1, py: 0.2, borderRadius: "6px", background: "rgba(108,99,255,0.1)" }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "primary.main", fontSize: "0.68rem" }}>
                {notifications.length}
              </Typography>
            </Box>
          </Box>
          <NotificationList data={notifications} markRead={handleMarkRead} />
        </Box>
      </Fade>

      {/* pagination */}
      <Fade in timeout={1000}>
        <Paper elevation={0} sx={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          p: 2, mb: 4, ...glassPanel,
        }}>
          <Button variant="outlined" startIcon={<NavigateBeforeIcon />} size="small"
            disabled={page === 1}
            onClick={() => { setPage(p => p - 1); setTimeout(loadNotifications, 100); }}>
            Previous
          </Button>
          <Box sx={{ px: 2.5, py: 0.5, borderRadius: "8px", background: "rgba(108,99,255,0.08)" }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.main" }}>
              Page {page}
            </Typography>
          </Box>
          <Button variant="outlined" endIcon={<NavigateNextIcon />} size="small"
            onClick={() => { setPage(p => p + 1); setTimeout(loadNotifications, 100); }}>
            Next
          </Button>
        </Paper>
      </Fade>
    </>
  );
}
