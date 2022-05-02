import { Box, Grid, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { swalError } from "../../../../components/Alert/Alert";
// import { MySwal } from "./../../../../components/Alert/Alert";
function Banner({ isLogin }) {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("handleClick is running");
    if (isLogin) {
      //  navigate("/chat")
    } else {
      swalError();
    }
  };
  return (
    <Box sx={{ mt: 8 }}>
      <Grid container>
        <Grid item xs={12} sx={{ position: "relative" }}>
          <img src="./banner.svg" style={{ width: "100%" }} alt="banner"></img>
          <div
            className=""
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 3,
              transform: "translate(-50%, -60%)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              color="initial"
              sx={{
                color: "#fff",
              }}
            >
              Làm việc mọi lúc mọi nơi, gặp người mình thích. Yêu người mình yêu
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#4324a6",

                padding: "10px 30px",
                marginTop: "10px",
                ":hover": {
                  bgcolor: "#fff",
                  opacity: 0.9,
                },
              }}
              onClick={() => handleClick()}
            >
              Dùng thử miễn phí
            </Button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Banner;
