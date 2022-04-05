import { Box, Grid, Typography, Button } from "@mui/material";
import React from "react";

function Banner() {
  return (
    <Box sx={{ mt: 8 }}>
      <Grid container>
        <Grid item xs="12" sx={{ position: "relative" }}>
          <img src="./banner.svg"></img>
          <Typography
            variant="h6"
            color="initial"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 3,
              color: "#fff",
              transform: "translate(-50%, -500%)",
            }}
          >
            Làm việc mọi lúc mọi nơi, gặp người mình thích. Yêu người mình yêu
          </Typography>
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              backgroundColor: "#fff",
              color: "#4324a6",
              zIndex: 9,
              bottom: "50%",
              right: "50%",
              padding: "10px 30px",
              transform: "translate(50%, -100%)",
              ":hover": {
                bgcolor: "#fff",
                opacity: 0.9,
              },
            }}
          >
            Dùng thử miễn phí
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Banner;
