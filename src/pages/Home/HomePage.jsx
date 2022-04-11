import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userService } from "../../services/user/user.service";
import { userLoginAction } from "../../store/actions/auth.action";
import { saveUserAction } from "../../store/actions/users.action";
import { USER_LOGIN } from "../../store/constants/auth.constant";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainForm from "./components/MainForm";
import Pricing from "./components/Pricing/Pricing";
import TeamTest from "./components/TeamTest";
import "./HomePage.css";

function HomePage() {
  const [user, setUser] = useState();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      userLoginAction({
        email: "ab@gmail.com",
        password: "123",
      })
    );
  }, [dispatch]);

  return (
    <div>
      <Header isLogin={isLogin} />
      <Banner isLogin={isLogin} />
      <Pricing />

      <TeamTest />
      <Footer />
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
      {isLogin && <MainForm user={user} isLogin={isLogin} />}
    </div>
  );
}

export default HomePage;
