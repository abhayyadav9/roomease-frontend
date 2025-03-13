import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box, styled, Paper, Fade } from "@mui/material";
import OwnersMessage from "./OwnersMessage";
import TenantsMessage from "./TenantsMessage";
import AdminMessage from "./AdminMessage";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const MessageLayout = () => {
  const [alignment, setAlignment] = React.useState("owner");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "85vh",
        bgcolor: "background.default",
      }}
    >
      {/* Left Navigation Panel */}
      <Paper
        elevation={4}
        sx={{
          width: { xs: "100%", md: 250 },
          transition: "width 0.3s",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
          <Box component="h2" sx={{ typography: "h6", fontWeight: "bold" }}>
            Message Dashboard
          </Box>
          <Box component="p" sx={{ typography: "body2", color: "text.secondary", mt: 1 }}>
            Manage communications
          </Box>
        </Box>

        <Box >
          <StyledToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Message type"
            fullWidth
          >
            <ToggleButton value="owner" aria-label="owner">
              Owner
            </ToggleButton>
            <ToggleButton value="tenant" aria-label="tenant">
              Tenant
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Box>

        <Box sx={{ flexGrow: 1, }}>
          <Fade in={alignment === "owner"} timeout={500} unmountOnExit>
            <Box>
              {alignment === "owner" && <OwnersMessage />}
            </Box>
          </Fade>
          <Fade in={alignment === "tenant"} timeout={500} unmountOnExit>
            <Box>
              {alignment === "tenant" && <TenantsMessage />}
            </Box>
          </Fade>
        </Box>
      </Paper>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, ml: { xs: 0, md: 2 }, mt: { xs: 2, md: 0 } }}>
        <Paper elevation={4} sx={{ height: "100%", borderRadius: 2, overflow: "hidden" }}>
          <Fade in timeout={500}>
            <Box sx={{ height: "100%", p: 2 }}>
              <AdminMessage />
            </Box>
          </Fade>
        </Paper>
      </Box>
    </Box>
  );
};

export default MessageLayout;
