import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainForm from "./components/MainForm";
import "./HomePage.css";
function HomePage() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  const responseGoogle = (response) => {
    if (!response.error) {
      console.log(response);
      const { profileObj } = response;
      setUser(profileObj);
      setLogin(true);
      toast.success(`Chào mừng ${profileObj.givenName} đã đăng nhập thành công`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div>
      <Typography align="center" variant="h3" component="h2">
        GOOGLE MEET CLONE APP
      </Typography>
      {!login && (
        <Box sx={{ mx: "auto", width: 200 }}>
          <GoogleLogin
            clientId="710407096844-19ar3a8e3vrlj4vfa2enj6tfs43f3r6v.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button variant="contained" onClick={renderProps.onClick}>
                LOGIN WITH GOOGLE
              </Button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </Box>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {login && <MainForm user={user} login={login} />}
    </div>
  );
}

export default HomePage;
