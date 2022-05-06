import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./pageNotFound.css";
function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      className="page-not-found-container"
    >
      <Box sx={{ flex: 2 }}>
        <img src="/404.svg" style={{ width: "100%", height: "100%" }} alt="" />
      </Box>
      <Box className="" sx={{ flex: 1 }}>
        <Typography component="h1" variant="h4">
          Liên kết không tồn tại !
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/");
          }}
        >
          Về trang chủ
        </Button>
      </Box>
    </Box>
  );
}

export default PageNotFound;
