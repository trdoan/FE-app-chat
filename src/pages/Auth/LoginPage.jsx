import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Button, IconButton, Modal } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, signUpAction } from "../../store/actions/auth.action";
import FormLogin from "./components/FormLogin/FormLogin";
import CloseIcon from "@mui/icons-material/Close";

import "./LoginPage.scss";
import FormSignUp from "./components/FormSignUp/FormSignUp";
import { fetchDataOffAction, fetchDataOnAction } from "../../store/actions/common.action";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};
export default function LoginPage() {
  console.log("RENDER LOGIN PAGE");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    dispatch(fetchDataOnAction());
    await dispatch(loginAction(data));
    dispatch(fetchDataOffAction());
  };
  // modal
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const login = useSelector((state) => state.auth.isLogin);
  const handleClose = () => setOpen(false);
  const handleOpen = (data) => {
    dispatch({ type: "OPEN_MODAL" });
    setContent(data);
    setOpen(true);
  };

  useEffect(() => {
    login && navigate("/lobby");
  }, [login]);
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://cdn.vietnambiz.vn/171464876016439296/2020/6/3/gettyimages-1215704164-1591179886209722498072.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
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
          <FormLogin handleLogin={handleLogin} />

          <Grid container sx={{ justifyContent: "space-between" }}>
            <Button
              variant="body2"
              sx={{
                marginLeft: "auto",
                color: "primary.main",
                textDecoration: "none",
                "&:hover": {
                  color: "primary.main",
                  textDecoration: "none",
                },
              }}
              onClick={() => handleOpen("SIGN_UP_FORM")}
            >
              {"ĐĂNG KÝ NGAY"}
            </Button>
          </Grid>
        </Box>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {content === "SIGN_UP_FORM" && <FormSignUp />}
          <IconButton sx={{ position: "absolute", top: 0, right: 0 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </Grid>
  );
}
