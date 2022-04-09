import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { toast } from "react-toastify";
import FormLogin from "./components/FormLogin/FormLogin";
import "./LoginPage.scss";

export default function LoginPage() {
  const responseGoogle = (response) => {
    if (!response.error) {
      console.log(response);
      const { profileObj } = response;

      toast.success(
        `Chào mừng ${profileObj.givenName} đã đăng nhập thành công`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };
  const handleFormSubmit = (data) => {
    console.log(data);
    toast.success("Đăng nhập thành công", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://cdn.vietnambiz.vn/171464876016439296/2020/6/3/gettyimages-1215704164-1591179886209722498072.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ĐĂNG NHẬP
          </Typography>
          <FormLogin handleFormSubmit={handleFormSubmit} />
        </Box>
      </Grid>
    </Grid>
  );
}
