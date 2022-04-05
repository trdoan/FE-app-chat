import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
function GridVideo({ data }) {
  return (
    <Grid container spacing={1} sx={{ my: 3 }}>
      {data.map((item) => {
        return (
          <Grid item xs={3}>
            <div style={{ paddingTop: "56.25%", position: "relative", width: "100%" }}>
              <img
                src={item.stream}
                alt=""
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default GridVideo;
