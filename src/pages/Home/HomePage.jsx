import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveUserAction } from "../../store/actions/users.action";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainForm from "./components/MainForm";
import TeamTest from "./components/TeamTest";
import Pricing from "./components/Test";
import "./HomePage.css";




function HomePage() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState();
  const dispatch = useDispatch();


  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(saveUserAction(user));
      setLogin(true);
    }
  }, [user]);

  return (
    <div>
      <Header/>
      <Banner/>
      <Pricing/>

      <TeamTest />
      <Footer/>
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
