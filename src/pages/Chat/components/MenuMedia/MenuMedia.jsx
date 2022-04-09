import { Box } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
function MenuMedia() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        boxShadow: 2,
        width: "100%",
        padding: 2,
        fontSize: 5,
        backgroundColor: "common.white",
      }}
    >
      <Stack direction="row" spacing={3}>
        <IconButton size="large" sx={{ boxShadow: 1 }}>
          <KeyboardVoiceIcon />
        </IconButton>
        <IconButton size="large" sx={{ boxShadow: 1 }}>
          <ScreenShareIcon />
        </IconButton>
        <IconButton size="large" sx={{ boxShadow: 1 }}>
          <VideocamIcon />
        </IconButton>
        <IconButton
          size="large"
          sx={{
            boxShadow: 1,
            backgroundColor: "error.main",
            color: "common.white",
            ":hover": {
              backgroundColor: "error.main",
            },
          }}
        >
          <CallEndIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default MenuMedia;
